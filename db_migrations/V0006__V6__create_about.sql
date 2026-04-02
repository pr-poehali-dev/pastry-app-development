CREATE TABLE about (
    id SERIAL PRIMARY KEY,
    founded_year INTEGER DEFAULT 2018,
    tagline VARCHAR(255),
    description_1 TEXT,
    description_2 TEXT,
    description_3 TEXT,
    clients_count VARCHAR(50),
    masters_count VARCHAR(50),
    rating VARCHAR(20),
    years_label VARCHAR(50),
    address VARCHAR(255),
    phone VARCHAR(30),
    email VARCHAR(100),
    work_hours VARCHAR(100),
    image_url TEXT,
    updated_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO about (
    founded_year, tagline,
    description_1, description_2, description_3,
    clients_count, masters_count, rating, years_label,
    address, phone, email, work_hours
) VALUES (
    2018,
    'Создаём вкус с 2018 года',
    'Patisserie — это маленькая авторская кондитерская, основанная кондитером Анной Волковой в 2018 году. Всё начиналось с домашней кухни и нескольких рецептов, переданных из поколения в поколение.',
    'Сегодня мы — команда из восьми мастеров, которые каждое утро создают торты, пирожные и макаруны вручную. Мы не используем полуфабрикаты и готовые смеси — только свежие продукты от проверенных поставщиков.',
    'Наш принцип прост: если не можем сделать идеально — лучше не делать вовсе.',
    '12 000+', '8', '4.9', '6 лет',
    'ул. Пушкина, 12, Москва',
    '+7 (495) 123-45-67',
    'hello@patisserie.ru',
    'Пн–Пт: 9:00–20:00, Сб–Вс: 10:00–19:00'
);