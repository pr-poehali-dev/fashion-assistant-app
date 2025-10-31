import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Сохранение и получение данных пользователя (анкета, AI-анализ)
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
                'Access-Control-Allow-Methods': 'GET, POST, PUT, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            if method == 'POST':
                body_data = json.loads(event.get('body', '{}'))
                action = body_data.get('action')
                user_id = body_data.get('user_id')
                
                if action == 'save_ai_analysis':
                    cur.execute("""
                        INSERT INTO user_profiles 
                        (user_id, profile_photo_url, ai_color_type, ai_body_type, 
                         ai_recommended_styles, ai_recommended_colors, ai_avoid_colors, 
                         ai_similar_celebrities, analyzed_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
                        ON CONFLICT (user_id) DO UPDATE SET
                            profile_photo_url = EXCLUDED.profile_photo_url,
                            ai_color_type = EXCLUDED.ai_color_type,
                            ai_body_type = EXCLUDED.ai_body_type,
                            ai_recommended_styles = EXCLUDED.ai_recommended_styles,
                            ai_recommended_colors = EXCLUDED.ai_recommended_colors,
                            ai_avoid_colors = EXCLUDED.ai_avoid_colors,
                            ai_similar_celebrities = EXCLUDED.ai_similar_celebrities,
                            analyzed_at = CURRENT_TIMESTAMP,
                            updated_at = CURRENT_TIMESTAMP
                        RETURNING id
                    """, (
                        user_id,
                        body_data.get('profile_photo_url'),
                        body_data.get('color_type'),
                        body_data.get('body_type'),
                        body_data.get('recommended_styles', []),
                        body_data.get('recommended_colors', []),
                        body_data.get('avoid_colors', []),
                        body_data.get('similar_celebrities', [])
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
                        'body': json.dumps({'success': True, 'profile_id': result['id']})
                    }
                
                elif action == 'save_preferences':
                    cur.execute("""
                        INSERT INTO user_preferences 
                        (user_id, favorite_styles, favorite_occasions, favorite_colors,
                         favorite_celebrities, fashion_icons, favorite_brands, 
                         budget_min, budget_max, additional_notes, completed_at)
                        VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, CURRENT_TIMESTAMP)
                        ON CONFLICT (user_id) DO UPDATE SET
                            favorite_styles = EXCLUDED.favorite_styles,
                            favorite_occasions = EXCLUDED.favorite_occasions,
                            favorite_colors = EXCLUDED.favorite_colors,
                            favorite_celebrities = EXCLUDED.favorite_celebrities,
                            fashion_icons = EXCLUDED.fashion_icons,
                            favorite_brands = EXCLUDED.favorite_brands,
                            budget_min = EXCLUDED.budget_min,
                            budget_max = EXCLUDED.budget_max,
                            additional_notes = EXCLUDED.additional_notes,
                            completed_at = CURRENT_TIMESTAMP,
                            updated_at = CURRENT_TIMESTAMP
                        RETURNING id
                    """, (
                        user_id,
                        body_data.get('favorite_styles', []),
                        body_data.get('favorite_occasions', []),
                        body_data.get('favorite_colors', []),
                        body_data.get('favorite_celebrities', ''),
                        body_data.get('fashion_icons', ''),
                        body_data.get('favorite_brands', ''),
                        body_data.get('budget_min', 5000),
                        body_data.get('budget_max', 200000),
                        body_data.get('additional_notes', '')
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
                        'body': json.dumps({'success': True, 'preferences_id': result['id']})
                    }
            
            elif method == 'GET':
                params = event.get('queryStringParameters', {}) or {}
                user_id = params.get('user_id')
                data_type = params.get('type', 'profile')
                
                if data_type == 'profile':
                    cur.execute("""
                        SELECT * FROM user_profiles WHERE user_id = %s
                    """, (user_id,))
                    profile = cur.fetchone()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'profile': dict(profile) if profile else None}, default=str)
                    }
                
                elif data_type == 'preferences':
                    cur.execute("""
                        SELECT * FROM user_preferences WHERE user_id = %s
                    """, (user_id,))
                    preferences = cur.fetchone()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'preferences': dict(preferences) if preferences else None}, default=str)
                    }
                
                elif data_type == 'all':
                    cur.execute("""
                        SELECT * FROM user_profiles WHERE user_id = %s
                    """, (user_id,))
                    profile = cur.fetchone()
                    
                    cur.execute("""
                        SELECT * FROM user_preferences WHERE user_id = %s
                    """, (user_id,))
                    preferences = cur.fetchone()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({
                            'profile': dict(profile) if profile else None,
                            'preferences': dict(preferences) if preferences else None
                        }, default=str)
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
