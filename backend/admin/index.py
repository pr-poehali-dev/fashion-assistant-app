import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Админ-панель для управления баннерами, салонами и настройками
    Args: event - dict с httpMethod, body, queryStringParameters
          context - объект с атрибутами request_id, function_name
    Returns: HTTP response dict
    '''
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-Admin-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            if method == 'GET':
                params = event.get('queryStringParameters', {}) or {}
                resource = params.get('resource', 'settings')
                
                if resource == 'banners':
                    cur.execute("""
                        SELECT * FROM ad_banners 
                        ORDER BY priority DESC, created_at DESC
                    """)
                    banners = cur.fetchall()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'banners': [dict(b) for b in banners]}, default=str)
                    }
                
                elif resource == 'salons':
                    cur.execute("""
                        SELECT s.*, 
                               COUNT(DISTINCT ss.id) as services_count,
                               COUNT(DISTINCT bb.id) as bookings_count
                        FROM beauty_salons s
                        LEFT JOIN salon_services ss ON s.id = ss.salon_id
                        LEFT JOIN beauty_bookings bb ON s.id = bb.salon_id
                        GROUP BY s.id
                        ORDER BY s.is_partner DESC, s.rating DESC
                    """)
                    salons = cur.fetchall()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'salons': [dict(s) for s in salons]}, default=str)
                    }
                
                elif resource == 'settings':
                    category = params.get('category')
                    
                    if category:
                        cur.execute("""
                            SELECT * FROM platform_settings 
                            WHERE category = %s
                            ORDER BY setting_key
                        """, (category,))
                    else:
                        cur.execute("""
                            SELECT * FROM platform_settings 
                            ORDER BY category, setting_key
                        """)
                    
                    settings = cur.fetchall()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'settings': [dict(s) for s in settings]}, default=str)
                    }
                
                elif resource == 'stats':
                    cur.execute("""
                        SELECT 
                            (SELECT COUNT(*) FROM ad_clicks) as total_ad_clicks,
                            (SELECT SUM(click_cost) FROM ad_clicks) as total_ad_revenue,
                            (SELECT COUNT(*) FROM beauty_bookings) as total_bookings,
                            (SELECT COUNT(*) FROM beauty_bookings WHERE status = 'completed') as completed_bookings,
                            (SELECT COUNT(DISTINCT user_id) FROM user_profiles) as users_with_profile,
                            (SELECT COUNT(DISTINCT user_id) FROM user_preferences) as users_with_preferences
                    """)
                    stats = cur.fetchone()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'stats': dict(stats)}, default=str)
                    }
            
            elif method == 'POST':
                body_data = json.loads(event.get('body', '{}'))
                resource = body_data.get('resource')
                
                if resource == 'banner':
                    cur.execute("""
                        INSERT INTO ad_banners 
                        (advertiser, title, description, image_url, link_url, 
                         cta_text, click_cost, is_active, is_partner, priority)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s)
                        RETURNING id
                    """, (
                        body_data.get('advertiser'),
                        body_data.get('title'),
                        body_data.get('description'),
                        body_data.get('image_url'),
                        body_data.get('link_url'),
                        body_data.get('cta_text', 'Перейти'),
                        body_data.get('click_cost', 10.0),
                        body_data.get('is_active', True),
                        body_data.get('is_partner', False),
                        body_data.get('priority', 0)
                    ))
                    result = cur.fetchone()
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'success': True, 'banner_id': result['id']})
                    }
                
                elif resource == 'salon':
                    cur.execute("""
                        INSERT INTO beauty_salons 
                        (name, address, rating, reviews_count, is_partner, image_url)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id
                    """, (
                        body_data.get('name'),
                        body_data.get('address'),
                        body_data.get('rating', 0.0),
                        body_data.get('reviews_count', 0),
                        body_data.get('is_partner', False),
                        body_data.get('image_url')
                    ))
                    result = cur.fetchone()
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'success': True, 'salon_id': result['id']})
                    }
            
            elif method == 'PUT':
                body_data = json.loads(event.get('body', '{}'))
                resource = body_data.get('resource')
                
                if resource == 'banner':
                    banner_id = body_data.get('id')
                    cur.execute("""
                        UPDATE ad_banners SET
                            advertiser = %s,
                            title = %s,
                            description = %s,
                            image_url = %s,
                            link_url = %s,
                            cta_text = %s,
                            click_cost = %s,
                            is_active = %s,
                            is_partner = %s,
                            priority = %s,
                            updated_at = CURRENT_TIMESTAMP
                        WHERE id = %s
                        RETURNING id
                    """, (
                        body_data.get('advertiser'),
                        body_data.get('title'),
                        body_data.get('description'),
                        body_data.get('image_url'),
                        body_data.get('link_url'),
                        body_data.get('cta_text'),
                        body_data.get('click_cost'),
                        body_data.get('is_active'),
                        body_data.get('is_partner'),
                        body_data.get('priority'),
                        banner_id
                    ))
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'success': True})
                    }
                
                elif resource == 'salon':
                    salon_id = body_data.get('id')
                    cur.execute("""
                        UPDATE beauty_salons SET
                            name = %s,
                            address = %s,
                            rating = %s,
                            reviews_count = %s,
                            is_partner = %s,
                            image_url = %s
                        WHERE id = %s
                        RETURNING id
                    """, (
                        body_data.get('name'),
                        body_data.get('address'),
                        body_data.get('rating'),
                        body_data.get('reviews_count'),
                        body_data.get('is_partner'),
                        body_data.get('image_url'),
                        salon_id
                    ))
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'success': True})
                    }
                
                elif resource == 'setting':
                    setting_key = body_data.get('key')
                    cur.execute("""
                        UPDATE platform_settings SET
                            setting_value = %s,
                            updated_at = CURRENT_TIMESTAMP
                        WHERE setting_key = %s
                        RETURNING id
                    """, (
                        body_data.get('value'),
                        setting_key
                    ))
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'success': True})
                    }
            
            return {
                'statusCode': 400,
                'headers': {
                    'Content-Type': 'application/json',
                    'Access-Control-Allow-Origin': '*'
                },
                'isBase64Encoded': False,
                'body': json.dumps({'error': 'Invalid request'})
            }
    
    finally:
        conn.close()
