import json
import os
from typing import Dict, Any
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Управление подписками и начисление бонусов за рефералов
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
                'Access-Control-Allow-Methods': 'POST, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id',
                'Access-Control-Max-Age': '86400'
            },
            'body': ''
        }
    
    if method != 'POST':
        return {
            'statusCode': 405,
            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
            'body': json.dumps({'error': 'Метод не поддерживается'})
        }
    
    db_url = os.environ.get('DATABASE_URL')
    conn = psycopg2.connect(db_url)
    
    try:
        with conn.cursor(cursor_factory=RealDictCursor) as cur:
            body_data = json.loads(event.get('body', '{}'))
            action = body_data.get('action')
            user_id = body_data.get('user_id')
            
            if not user_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'user_id обязателен'})
                }
            
            if action == 'subscribe':
                months = body_data.get('months', 1)
                
                # Получаем текущего пользователя
                cur.execute("""
                    SELECT subscription_ends_at, bonus_months, referred_by_code
                    FROM users WHERE id = %s
                """, (user_id,))
                user = cur.fetchone()
                
                if not user:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь не найден'})
                    }
                
                # Расчёт новой даты окончания
                now = datetime.now()
                current_end = user['subscription_ends_at'] if user['subscription_ends_at'] and user['subscription_ends_at'] > now else now
                new_end = current_end + timedelta(days=30 * months)
                
                # Обновление подписки
                cur.execute("""
                    UPDATE users 
                    SET subscription_type = 'paid',
                        subscription_ends_at = %s,
                        updated_at = NOW()
                    WHERE id = %s
                """, (new_end, user_id))
                
                # Обновление статуса реферала
                if user['referred_by_code']:
                    cur.execute("""
                        UPDATE referrals 
                        SET status = 'subscribed'
                        WHERE referred_user_id = %s
                    """, (user_id,))
                    
                    # Проверка бонуса для реферера
                    cur.execute("""
                        SELECT u.id, u.bonus_months, COUNT(r.id) as subscribed_count
                        FROM users u
                        JOIN referrals r ON r.referrer_user_id = u.id
                        WHERE u.referral_code = %s AND r.status = 'subscribed' AND r.bonus_granted = FALSE
                        GROUP BY u.id, u.bonus_months
                    """, (user['referred_by_code'],))
                    
                    referrer = cur.fetchone()
                    if referrer and referrer['subscribed_count'] >= 10:
                        # Начисляем 3 месяца бонуса
                        cur.execute("""
                            UPDATE users 
                            SET subscription_ends_at = COALESCE(subscription_ends_at, NOW()) + INTERVAL '3 months',
                                bonus_months = bonus_months + 3,
                                subscription_type = 'paid'
                            WHERE id = %s
                        """, (referrer['id'],))
                        
                        # Отмечаем бонус как выданный
                        cur.execute("""
                            UPDATE referrals 
                            SET bonus_granted = TRUE
                            WHERE referrer_user_id = %s AND status = 'subscribed' AND bonus_granted = FALSE
                        """, (referrer['id'],))
                
                conn.commit()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'success': True,
                        'subscription_ends_at': new_end.isoformat(),
                        'months_added': months
                    })
                }
            
            elif action == 'check_status':
                cur.execute("""
                    SELECT subscription_type, trial_ends_at, subscription_ends_at, bonus_months
                    FROM users WHERE id = %s
                """, (user_id,))
                user = cur.fetchone()
                
                if not user:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь не найден'})
                    }
                
                now = datetime.now()
                has_access = False
                days_left = 0
                status = 'expired'
                
                if user['subscription_type'] == 'trial' and user['trial_ends_at'] > now:
                    has_access = True
                    days_left = (user['trial_ends_at'] - now).days
                    status = 'trial'
                elif user['subscription_ends_at'] and user['subscription_ends_at'] > now:
                    has_access = True
                    days_left = (user['subscription_ends_at'] - now).days
                    status = 'active'
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'has_access': has_access,
                        'status': status,
                        'days_left': days_left,
                        'bonus_months': user['bonus_months']
                    })
                }
            
            return {
                'statusCode': 400,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Неизвестное действие'})
            }
    
    finally:
        conn.close()
