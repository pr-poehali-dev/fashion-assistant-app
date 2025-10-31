import json
import os
import secrets
import string
from typing import Dict, Any
from datetime import datetime, timedelta
import psycopg2
from psycopg2.extras import RealDictCursor

def generate_referral_code(length: int = 8) -> str:
    """Генерация уникального реферального кода"""
    chars = string.ascii_uppercase + string.digits
    return ''.join(secrets.choice(chars) for _ in range(length))

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    '''
    Business: Регистрация и авторизация пользователей с триал-периодом и реферальной программой
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
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
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
                
                if action == 'register':
                    email = body_data.get('email')
                    name = body_data.get('name', '')
                    referred_by = body_data.get('referral_code')
                    
                    # Проверка существующего пользователя
                    cur.execute("SELECT id FROM users WHERE email = %s", (email,))
                    if cur.fetchone():
                        return {
                            'statusCode': 400,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Пользователь уже существует'})
                        }
                    
                    # Генерация уникального реферального кода
                    referral_code = generate_referral_code()
                    while True:
                        cur.execute("SELECT id FROM users WHERE referral_code = %s", (referral_code,))
                        if not cur.fetchone():
                            break
                        referral_code = generate_referral_code()
                    
                    # Создание пользователя
                    trial_ends = datetime.now() + timedelta(days=3)
                    cur.execute("""
                        INSERT INTO users (email, name, referral_code, referred_by_code, trial_ends_at)
                        VALUES (%s, %s, %s, %s, %s)
                        RETURNING id, email, name, referral_code, trial_ends_at, subscription_type
                    """, (email, name, referral_code, referred_by, trial_ends))
                    user = cur.fetchone()
                    
                    # Если есть реферальный код
                    if referred_by:
                        cur.execute("SELECT id FROM users WHERE referral_code = %s", (referred_by,))
                        referrer = cur.fetchone()
                        if referrer:
                            cur.execute("""
                                INSERT INTO referrals (referrer_user_id, referred_user_id, status)
                                VALUES (%s, %s, 'registered')
                            """, (referrer['id'], user['id']))
                    
                    conn.commit()
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'user': dict(user),
                            'trial_days_left': 3
                        }, default=str)
                    }
                
                elif action == 'login':
                    email = body_data.get('email')
                    
                    cur.execute("""
                        SELECT id, email, name, referral_code, trial_ends_at, 
                               subscription_type, subscription_ends_at, bonus_months
                        FROM users WHERE email = %s
                    """, (email,))
                    user = cur.fetchone()
                    
                    if not user:
                        return {
                            'statusCode': 404,
                            'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                            'body': json.dumps({'error': 'Пользователь не найден'})
                        }
                    
                    # Проверка статуса подписки
                    now = datetime.now()
                    has_access = False
                    days_left = 0
                    
                    if user['subscription_type'] == 'trial' and user['trial_ends_at'] > now:
                        has_access = True
                        days_left = (user['trial_ends_at'] - now).days
                    elif user['subscription_ends_at'] and user['subscription_ends_at'] > now:
                        has_access = True
                        days_left = (user['subscription_ends_at'] - now).days
                    
                    return {
                        'statusCode': 200,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({
                            'user': dict(user),
                            'has_access': has_access,
                            'days_left': days_left
                        }, default=str)
                    }
            
            elif method == 'GET':
                user_id = event.get('queryStringParameters', {}).get('user_id')
                
                if not user_id:
                    return {
                        'statusCode': 400,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'user_id обязателен'})
                    }
                
                # Получение информации о пользователе
                cur.execute("""
                    SELECT id, email, name, referral_code, trial_ends_at,
                           subscription_type, subscription_ends_at, bonus_months
                    FROM users WHERE id = %s
                """, (user_id,))
                user = cur.fetchone()
                
                if not user:
                    return {
                        'statusCode': 404,
                        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                        'body': json.dumps({'error': 'Пользователь не найден'})
                    }
                
                # Подсчёт рефералов
                cur.execute("""
                    SELECT COUNT(*) as total,
                           SUM(CASE WHEN status = 'subscribed' THEN 1 ELSE 0 END) as subscribed
                    FROM referrals WHERE referrer_user_id = %s
                """, (user_id,))
                referral_stats = cur.fetchone()
                
                return {
                    'statusCode': 200,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({
                        'user': dict(user),
                        'referrals': {
                            'total': referral_stats['total'] or 0,
                            'subscribed': referral_stats['subscribed'] or 0,
                            'progress_to_bonus': min(100, ((referral_stats['subscribed'] or 0) / 10) * 100)
                        }
                    }, default=str)
                }
    
    finally:
        conn.close()
    
    return {
        'statusCode': 405,
        'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
        'body': json.dumps({'error': 'Метод не поддерживается'})
    }
