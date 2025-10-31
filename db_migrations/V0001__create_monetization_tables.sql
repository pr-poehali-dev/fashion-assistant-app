-- Таблица пользователей с подписками
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    name VARCHAR(255),
    referral_code VARCHAR(50) UNIQUE NOT NULL,
    referred_by_code VARCHAR(50),
    trial_ends_at TIMESTAMP NOT NULL DEFAULT (NOW() + INTERVAL '3 days'),
    subscription_type VARCHAR(50) DEFAULT 'trial',
    subscription_ends_at TIMESTAMP,
    bonus_months INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Таблица рефералов
CREATE TABLE referrals (
    id SERIAL PRIMARY KEY,
    referrer_user_id INTEGER REFERENCES users(id),
    referred_user_id INTEGER REFERENCES users(id),
    status VARCHAR(50) DEFAULT 'registered',
    bonus_granted BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица магазинов-партнёров
CREATE TABLE partner_stores (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo_url TEXT,
    website_url TEXT,
    priority_level INTEGER DEFAULT 0,
    click_rate_rub DECIMAL(10, 2) DEFAULT 10.00,
    commission_percent DECIMAL(5, 2) DEFAULT 5.00,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Таблица кликов в магазины
CREATE TABLE store_clicks (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    store_id INTEGER REFERENCES partner_stores(id),
    product_url TEXT,
    clicked_at TIMESTAMP DEFAULT NOW()
);

-- Таблица заказов через партнёров
CREATE TABLE partner_orders (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    store_id INTEGER REFERENCES partner_stores(id),
    order_amount DECIMAL(10, 2) NOT NULL,
    commission_amount DECIMAL(10, 2) NOT NULL,
    order_external_id VARCHAR(255),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT NOW()
);

-- Индексы для оптимизации
CREATE INDEX idx_users_referral_code ON users(referral_code);
CREATE INDEX idx_users_referred_by ON users(referred_by_code);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_user_id);
CREATE INDEX idx_store_clicks_user ON store_clicks(user_id);
CREATE INDEX idx_store_clicks_store ON store_clicks(store_id);
CREATE INDEX idx_partner_orders_user ON partner_orders(user_id);
CREATE INDEX idx_partner_orders_store ON partner_orders(store_id);