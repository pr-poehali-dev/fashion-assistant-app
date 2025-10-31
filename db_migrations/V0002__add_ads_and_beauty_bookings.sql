-- Таблица для трекинга кликов по рекламным баннерам
CREATE TABLE IF NOT EXISTS ad_clicks (
    id SERIAL PRIMARY KEY,
    ad_id INTEGER NOT NULL,
    advertiser VARCHAR(255) NOT NULL,
    click_cost DECIMAL(10, 2) DEFAULT 10.00,
    clicked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_ad_clicks_advertiser ON ad_clicks(advertiser);
CREATE INDEX idx_ad_clicks_date ON ad_clicks(clicked_at);

-- Таблица салонов красоты партнёров
CREATE TABLE IF NOT EXISTS beauty_salons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    address TEXT NOT NULL,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    reviews_count INTEGER DEFAULT 0,
    is_partner BOOLEAN DEFAULT false,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Таблица услуг салонов
CREATE TABLE IF NOT EXISTS salon_services (
    id SERIAL PRIMARY KEY,
    salon_id INTEGER REFERENCES beauty_salons(id),
    service_type VARCHAR(50) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    duration_minutes INTEGER NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_salon_services_salon ON salon_services(salon_id);
CREATE INDEX idx_salon_services_type ON salon_services(service_type);

-- Таблица записей на услуги
CREATE TABLE IF NOT EXISTS beauty_bookings (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL,
    salon_id INTEGER REFERENCES beauty_salons(id),
    service_id INTEGER REFERENCES salon_services(id),
    booking_date DATE NOT NULL,
    booking_time TIME NOT NULL,
    status VARCHAR(50) DEFAULT 'pending',
    total_price DECIMAL(10, 2) NOT NULL,
    notes TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_beauty_bookings_user ON beauty_bookings(user_id);
CREATE INDEX idx_beauty_bookings_salon ON beauty_bookings(salon_id);
CREATE INDEX idx_beauty_bookings_date ON beauty_bookings(booking_date);
CREATE INDEX idx_beauty_bookings_status ON beauty_bookings(status);

-- Вставка тестовых салонов
INSERT INTO beauty_salons (name, address, rating, reviews_count, is_partner, image_url) VALUES
('Beauty Point Premium', 'Тверская 15, м. Тверская', 4.9, 342, true, 'https://cdn.poehali.dev/default-salon.jpg'),
('Glamour Studio', 'Арбат 28, м. Арбатская', 4.8, 256, true, 'https://cdn.poehali.dev/default-salon.jpg'),
('Luxury Beauty Bar', 'Кутузовский 12, м. Киевская', 4.7, 189, true, 'https://cdn.poehali.dev/default-salon.jpg'),
('Beauty Lounge', 'Новый Арбат 5, м. Арбатская', 4.6, 145, false, 'https://cdn.poehali.dev/default-salon.jpg');

-- Вставка услуг для салонов
INSERT INTO salon_services (salon_id, service_type, price, duration_minutes, description) VALUES
(1, 'makeup', 3500, 60, 'Профессиональный макияж'),
(1, 'hair', 2500, 90, 'Стрижка и укладка'),
(1, 'manicure', 1800, 60, 'Маникюр с покрытием гель-лак'),
(1, 'pedicure', 2200, 75, 'Педикюр с покрытием'),
(2, 'makeup', 3000, 50, 'Макияж на любой случай'),
(2, 'hair', 2000, 80, 'Стрижка и окрашивание'),
(2, 'manicure', 1500, 50, 'Классический маникюр'),
(2, 'pedicure', 1900, 70, 'Spa-педикюр'),
(3, 'makeup', 4500, 70, 'Премиум макияж'),
(3, 'hair', 3500, 100, 'Сложное окрашивание'),
(3, 'manicure', 2500, 70, 'Маникюр с дизайном'),
(3, 'pedicure', 2800, 85, 'Педикюр премиум'),
(4, 'makeup', 2500, 45, 'Дневной макияж'),
(4, 'hair', 1800, 70, 'Базовая стрижка'),
(4, 'manicure', 1200, 45, 'Простой маникюр'),
(4, 'pedicure', 1600, 60, 'Базовый педикюр');
