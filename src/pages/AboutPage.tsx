import { useState, useEffect } from 'react';

const ABOUT_URL = 'https://functions.poehali.dev/24f968f3-3d0d-4cc3-b7e5-dffda2547c2e';

interface AboutData {
  founded_year: number;
  tagline: string;
  description_1: string;
  description_2: string;
  description_3: string;
  clients_count: string;
  masters_count: string;
  rating: string;
  years_label: string;
  address: string;
  phone: string;
  email: string;
  work_hours: string;
  image_url: string | null;
}

const FALLBACK: AboutData = {
  founded_year: 2018,
  tagline: 'Создаём вкус с 2018 года',
  description_1: 'Patisserie — это маленькая авторская кондитерская, основанная кондитером Анной Волковой в 2018 году. Всё начиналось с домашней кухни и нескольких рецептов, переданных из поколения в поколение.',
  description_2: 'Сегодня мы — команда из восьми мастеров, которые каждое утро создают торты, пирожные и макаруны вручную. Мы не используем полуфабрикаты и готовые смеси — только свежие продукты от проверенных поставщиков.',
  description_3: 'Наш принцип прост: если не можем сделать идеально — лучше не делать вовсе.',
  clients_count: '12 000+',
  masters_count: '8',
  rating: '4.9',
  years_label: '6 лет',
  address: 'ул. Пушкина, 12, Москва',
  phone: '+7 (495) 123-45-67',
  email: 'hello@patisserie.ru',
  work_hours: 'Пн–Пт: 9:00–20:00, Сб–Вс: 10:00–19:00',
  image_url: null,
};

const HERO_IMG = 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/1ca61c75-fd45-420d-8594-ac42a27d08cd.jpg';

export default function AboutPage() {
  const [data, setData] = useState<AboutData>(FALLBACK);

  useEffect(() => {
    fetch(ABOUT_URL)
      .then(r => r.json())
      .then(json => setData(json))
      .catch(() => {});
  }, []);

  const stats = [
    { num: data.years_label, label: 'на рынке' },
    { num: data.clients_count, label: 'довольных клиентов' },
    { num: data.masters_count, label: 'мастеров-кондитеров' },
    { num: `${data.rating} ★`, label: 'средняя оценка' },
  ];

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="max-w-4xl animate-fade-in">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">Наша история</p>
          <h1 className="font-serif text-6xl md:text-7xl font-light mb-16 leading-none" style={{ fontFamily: 'Cormorant, serif' }}>
            О нас
          </h1>

          <div className="grid md:grid-cols-2 gap-16 mb-20">
            <div>
              <img
                src={data.image_url ?? HERO_IMG}
                alt="Кондитерская"
                className="w-full aspect-[4/5] object-cover rounded-3xl"
              />
            </div>
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant, serif' }}>
                {data.tagline}
              </h2>
              <div className="space-y-4 text-sm text-muted-foreground leading-relaxed">
                <p>{data.description_1}</p>
                <p>{data.description_2}</p>
                <p>{data.description_3}</p>
              </div>
            </div>
          </div>

          {/* Values */}
          <div className="grid md:grid-cols-3 gap-8 mb-20">
            {[
              { num: '01', title: 'Натуральность', text: 'Никаких красителей, усилителей вкуса и консервантов. Только то, что вы ожидаете увидеть в составе.' },
              { num: '02', title: 'Мастерство', text: 'Каждый кондитер проходит обучение во Франции. Техника, точность и любовь к делу — наш стандарт.' },
              { num: '03', title: 'Свежесть', text: 'Готовим только на текущий день. Торты и пирожные никогда не лежат на полке дольше 24 часов.' },
            ].map((v, i) => (
              <div key={i} className="border-t border-border pt-6">
                <p className="text-3xl font-serif font-light text-muted-foreground mb-4" style={{ fontFamily: 'Cormorant, serif' }}>
                  {v.num}
                </p>
                <h3 className="font-semibold mb-2">{v.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{v.text}</p>
              </div>
            ))}
          </div>

          {/* Stats */}
          <div className="bg-secondary/40 rounded-3xl p-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {stats.map((s, i) => (
                <div key={i}>
                  <p className="font-serif text-4xl font-light mb-2" style={{ fontFamily: 'Cormorant, serif' }}>
                    {s.num}
                  </p>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
