-- Таблица профилей пользователей с AI-анализом
CREATE TABLE IF NOT EXISTS user_profiles (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    profile_photo_url TEXT,
    ai_color_type VARCHAR(100),
    ai_body_type VARCHAR(100),
    ai_recommended_styles TEXT[],
    ai_recommended_colors TEXT[],
    ai_avoid_colors TEXT[],
    ai_similar_celebrities TEXT[],
    analyzed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_profiles_user ON user_profiles(user_id);

-- Таблица предпочтений пользователей (анкета)
CREATE TABLE IF NOT EXISTS user_preferences (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL UNIQUE,
    favorite_styles TEXT[],
    favorite_occasions TEXT[],
    favorite_colors TEXT[],
    favorite_celebrities TEXT,
    fashion_icons TEXT,
    favorite_brands TEXT,
    budget_min INTEGER,
    budget_max INTEGER,
    additional_notes TEXT,
    completed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_preferences_user ON user_preferences(user_id);

-- Таблица рекламных баннеров
CREATE TABLE IF NOT EXISTS ad_banners (
    id SERIAL PRIMARY KEY,
    advertiser VARCHAR(255) NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    image_url TEXT NOT NULL,
    link_url TEXT NOT NULL,
    cta_text VARCHAR(100),
    click_cost DECIMAL(10, 2) DEFAULT 10.00,
    is_active BOOLEAN DEFAULT true,
    is_partner BOOLEAN DEFAULT false,
    priority INTEGER DEFAULT 0,
    start_date TIMESTAMP,
    end_date TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ad_banners_active ON ad_banners(is_active);
CREATE INDEX idx_ad_banners_priority ON ad_banners(priority);

-- Таблица настроек платформы
CREATE TABLE IF NOT EXISTS platform_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT,
    setting_type VARCHAR(50) DEFAULT 'text',
    category VARCHAR(100),
    description TEXT,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_platform_settings_key ON platform_settings(setting_key);
CREATE INDEX idx_platform_settings_category ON platform_settings(category);

-- Вставка базовых настроек платформы
INSERT INTO platform_settings (setting_key, setting_value, setting_type, category, description) VALUES
('contact_email', 'support@styleai.com', 'email', 'contacts', 'Email для связи'),
('contact_phone', '+7 (495) 123-45-67', 'phone', 'contacts', 'Телефон поддержки'),
('contact_telegram', '@styleai_support', 'text', 'contacts', 'Telegram для поддержки'),
('contact_address', 'Москва, Тверская 15', 'text', 'contacts', 'Адрес офиса'),
('trial_days', '3', 'number', 'subscription', 'Дней пробного периода'),
('referral_bonus_months', '3', 'number', 'subscription', 'Бонусных месяцев за 10 рефералов'),
('referral_required_count', '10', 'number', 'subscription', 'Количество рефералов для бонуса'),
('ad_click_cost', '10', 'number', 'advertising', 'Стоимость клика по рекламе (руб)'),
('store_click_cost', '10', 'number', 'partner', 'Стоимость клика в магазин (руб)'),
('store_commission_percent', '5', 'number', 'partner', 'Процент комиссии с заказа'),
('app_name', 'StyleAI', 'text', 'general', 'Название приложения'),
('app_tagline', 'Твой персональный стилист', 'text', 'general', 'Слоган приложения'),
('instagram_url', 'https://instagram.com/styleai', 'url', 'social', 'Instagram'),
('facebook_url', 'https://facebook.com/styleai', 'url', 'social', 'Facebook'),
('twitter_url', 'https://twitter.com/styleai', 'url', 'social', 'Twitter');

-- Вставка тестовых рекламных баннеров
INSERT INTO ad_banners (advertiser, title, description, image_url, link_url, cta_text, click_cost, is_active, is_partner, priority) VALUES
('ZARA', 'Новая коллекция весна-лето 2025', 'Скидка 30% на все платья', 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg', 'https://zara.com', 'Смотреть коллекцию', 10.00, true, true, 10),
('Beauty Point', 'Профессиональный макияж от 2500₽', 'Запись на сегодня со скидкой 20%', 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg', 'https://beautypoint.ru', 'Записаться', 10.00, true, true, 9),
('Lamoda', 'Обувь premium брендов', 'Бесплатная доставка от 2500₽', 'https://cdn.poehali.dev/projects/c64301f1-32f5-414e-8c14-68e3ed7fdcb3/files/5c819ff2-e109-4695-83f3-950791ccf638.jpg', 'https://lamoda.ru', 'В каталог', 10.00, true, true, 8);
