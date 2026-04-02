export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  oldPrice?: number;
  weight: string;
  description: string;
  image: string;
  badge?: string;
  ingredients?: string;
  allergens?: string;
}

export const categories = [
  { id: 'all', label: 'Все' },
  { id: 'cakes', label: 'Торты' },
  { id: 'pastries', label: 'Пирожные' },
  { id: 'macarons', label: 'Макаруны' },
  { id: 'sets', label: 'Наборы' },
];

export const products: Product[] = [
  {
    id: 1,
    name: 'Торт «Медовик»',
    category: 'cakes',
    price: 2800,
    weight: '1.2 кг',
    description: 'Нежнейшие медовые коржи с кремом из сметаны и карамели. Классика, которая никогда не надоедает.',
    image: 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/1ca61c75-fd45-420d-8594-ac42a27d08cd.jpg',
    badge: 'Хит',
    ingredients: 'Мука, мёд, яйца, сметана, сахар, масло, карамель',
    allergens: 'Глютен, яйца, молоко',
  },
  {
    id: 2,
    name: 'Торт «Три шоколада»',
    category: 'cakes',
    price: 3400,
    weight: '1.5 кг',
    description: 'Три слоя мусса — тёмный, молочный и белый шоколад на тонком брауни. Настоящее искусство.',
    image: 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/04176086-8d10-4ca2-a53b-bfd157eaee25.jpg',
    badge: 'Новинка',
    ingredients: 'Тёмный, молочный и белый шоколад, сливки, желатин, какао',
    allergens: 'Глютен, молоко, яйца',
  },
  {
    id: 3,
    name: 'Торт «Фрезье»',
    category: 'cakes',
    price: 3100,
    oldPrice: 3600,
    weight: '1.3 кг',
    description: 'Французский торт с клубникой, лёгким бисквитом и кремом муслин на основе ванили.',
    image: 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/161a7e46-1ad3-4538-971a-df529664ead2.jpg',
    badge: 'Скидка',
    ingredients: 'Бисквит, клубника, масляный крем, ваниль',
    allergens: 'Глютен, молоко, яйца',
  },
  {
    id: 4,
    name: 'Эклеры ассорти',
    category: 'pastries',
    price: 320,
    weight: '90 г / шт',
    description: 'Воздушное заварное тесто с кремами: ваниль, шоколад, фисташка, малина.',
    image: 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/04176086-8d10-4ca2-a53b-bfd157eaee25.jpg',
    badge: 'Хит',
    ingredients: 'Заварное тесто, сливки, яйца, масло',
    allergens: 'Глютен, молоко, яйца',
  },
  {
    id: 5,
    name: 'Тарталетка «Лимон»',
    category: 'pastries',
    price: 280,
    weight: '80 г / шт',
    description: 'Хрустящая песочная корзиночка с лимонным курдом и итальянской меренгой.',
    image: 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/161a7e46-1ad3-4538-971a-df529664ead2.jpg',
    ingredients: 'Песочное тесто, лимон, яйца, сахар, масло',
    allergens: 'Глютен, молоко, яйца',
  },
  {
    id: 6,
    name: 'Макаруны «Классика»',
    category: 'macarons',
    price: 180,
    weight: '25 г / шт',
    description: 'Миндальные пирожные с ганашем. Вкусы: ваниль, шоколад, фисташка, роза, малина.',
    image: 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/04176086-8d10-4ca2-a53b-bfd157eaee25.jpg',
    badge: 'Хит',
    ingredients: 'Миндальная мука, сахарная пудра, яичные белки, сливки, шоколад',
    allergens: 'Орехи, яйца, молоко',
  },
  {
    id: 7,
    name: 'Набор «Чайная церемония»',
    category: 'sets',
    price: 1800,
    weight: '500 г',
    description: '12 макарунов + 6 эклеров в подарочной коробке. Идеально для особого случая.',
    image: 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/161a7e46-1ad3-4538-971a-df529664ead2.jpg',
    badge: 'Подарок',
    ingredients: 'Ассорти пирожных',
    allergens: 'Глютен, молоко, яйца, орехи',
  },
  {
    id: 8,
    name: 'Тарт «Манго-маракуйя»',
    category: 'pastries',
    price: 310,
    weight: '85 г / шт',
    description: 'Экзотический тарт с тропическим конфи, кокосовым кремом и хрустящим сабле.',
    image: 'https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/1ca61c75-fd45-420d-8594-ac42a27d08cd.jpg',
    badge: 'Новинка',
    ingredients: 'Манго, маракуйя, кокосовые сливки, масло',
    allergens: 'Глютен, молоко, яйца',
  },
];
