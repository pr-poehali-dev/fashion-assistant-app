import json
import os
from typing import Dict, Any
from datetime import datetime
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Трекинг переходов в магазины-партнёры и начисление комиссий
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
                'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
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
                
                if action == 'track_ad_click':
                    ad_id = body_data.get('ad_id')
                    advertiser = body_data.get('advertiser', 'Unknown')
                    click_cost = body_data.get('click_cost', 10)
                    
                    cur.execute("""
                        INSERT INTO ad_clicks (ad_id, advertiser, click_cost, clicked_at)
                        VALUES (%s, %s, %s, CURRENT_TIMESTAMP)
                        RETURNING id
                    """, (ad_id, advertiser, click_cost))
                    click = cur.fetchone()
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {
                            'Content-Type': 'application/json',
                            'Access-Control-Allow-Origin': '*'
                        },
                        'isBase64Encoded': False,
                        'body': json.dumps({'success': True, 'click_id': click['id']})
                    }
                
                elif action == 'track_click':
                    user_id = body_data.get('user_id')
                    store_id = body_data.get('store_id')
                    product_url = body_data.get('product_url', '')
                    
                    # Сохранение клика
                    cur.execute("""
                        INSERT INTO store_clicks (user_id, store_id, product_url)
                        VALUES (%s, %s, %s)
                        RETURNING id
                    """, (user_id, store_id, product_url))
                    click = cur.fetchone()
                    
                    # Получение информации о магазине для тарификации
                    cur.execute("""
                        SELECT name, click_rate_rub FROM partner_stores WHERE id = %s
                    """, (store_id,))
                    store = cur.fetchone()
                    
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'click_id': click['id'],
                            'store': store['name'] if store else 'Unknown',
                            'charge': float(store['click_rate_rub']) if store else 10.0
                        })
                    }
                
                elif action == 'track_order':
                    user_id = body_data.get('user_id')
                    store_id = body_data.get('store_id')
                    order_amount = body_data.get('order_amount')
                    order_external_id = body_data.get('order_id', '')
                    
                    # Получение комиссии магазина
                    cur.execute("""
                        SELECT commission_percent FROM partner_stores WHERE id = %s
                    """, (store_id,))
                    store = cur.fetchone()
                    
                    if not store:
                        return {
                            'statusCode': 404,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Магазин не найден'})
                        }
                    
                    commission = (float(order_amount) * float(store['commission_percent'])) / 100
                    
                    # Сохранение заказа
                    cur.execute("""
                        INSERT INTO partner_orders 
                        (user_id, store_id, order_amount, commission_amount, order_external_id, status)
                        VALUES (%s, %s, %s, %s, %s, 'confirmed')
                        RETURNING id
                    """, (user_id, store_id, order_amount, commission, order_external_id))
                    order = cur.fetchone()
                    
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'order_id': order['id'],
                            'commission': commission,
                            'commission_percent': float(store['commission_percent'])
                        })
                    }
                
                elif action == 'add_partner':
                    name = body_data.get('name')
                    logo_url = body_data.get('logo_url', '')
                    website_url = body_data.get('website_url', '')
                    priority_level = body_data.get('priority_level', 0)
                    click_rate = body_data.get('click_rate_rub', 10.0)
                    commission = body_data.get('commission_percent', 5.0)
                    
                    cur.execute("""
                        INSERT INTO partner_stores 
                        (name, logo_url, website_url, priority_level, click_rate_rub, commission_percent)
                        VALUES (%s, %s, %s, %s, %s, %s)
                        RETURNING id, name, priority_level
                    """, (name, logo_url, website_url, priority_level, click_rate, commission))
                    partner = cur.fetchone()
                    
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'partner': dict(partner),
                            'success': True
                        })
                    }
            
            elif method == 'GET':
                params = event.get('queryStringParameters', {})
                action = params.get('action', 'list_partners')
                
                if action == 'list_partners':
                    # Список партнёрских магазинов с приоритетом
                    cur.execute("""
                        SELECT id, name, logo_url, website_url, priority_level, 
                               click_rate_rub, commission_percent, is_active
                        FROM partner_stores
                        WHERE is_active = TRUE
                        ORDER BY priority_level DESC, name ASC
                    """)
                    partners = cur.fetchall()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'partners': [dict(p) for p in partners]
                        }, default=str)
                    }
                
                elif action == 'stats':
                    store_id = params.get('store_id')
                    
                    if store_id:
                        # Статистика по конкретному магазину
                        cur.execute("""
                            SELECT 
                                COUNT(DISTINCT sc.id) as total_clicks,
                                COUNT(DISTINCT po.id) as total_orders,
                                COALESCE(SUM(po.order_amount), 0) as total_sales,
                                COALESCE(SUM(po.commission_amount), 0) as total_commission
                            FROM partner_stores ps
                            LEFT JOIN store_clicks sc ON sc.store_id = ps.id
                            LEFT JOIN partner_orders po ON po.store_id = ps.id
                            WHERE ps.id = %s
                            GROUP BY ps.id
                        """, (store_id,))
                    else:
                        # Общая статистика
                        cur.execute("""
                            SELECT 
                                COUNT(DISTINCT sc.id) as total_clicks,
                                COUNT(DISTINCT po.id) as total_orders,
                                COALESCE(SUM(po.order_amount), 0) as total_sales,
                                COALESCE(SUM(po.commission_amount), 0) as total_commission
                            FROM store_clicks sc
                            LEFT JOIN partner_orders po ON po.store_id = sc.store_id
                        """)
                    
                    stats = cur.fetchone()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps(dict(stats), default=str)
                    }
            
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Метод не поддерживается'})
            }
    
    finally:
        conn.close()