import { products } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/data/products';
import Icon from '@/components/ui/icon';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onSelectProduct: (product: Product) => void;
}

export default function HomePage({ onNavigate, onSelectProduct }: HomePageProps) {
  const hits = products.filter(p => p.badge === 'Хит').slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/04176086-8d10-4ca2-a53b-bfd157eaee25.jpg"
            alt="Кондитерская"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/60" />
        </div>
        <div className="relative container mx-auto px-6 py-32 animate-fade-in">
          <p className="text-xs tracking-[0.3em] uppercase text-muted-foreground mb-6">Авторская кондитерская</p>
          <h1 className="font-serif text-6xl md:text-8xl font-light leading-none mb-8 text-foreground" style={{ fontFamily: 'Cormorant, serif' }}>
            Вкус,<br />
            <em className="italic">рождённый</em><br />
            с любовью
          </h1>
          <p className="text-base text-muted-foreground max-w-md mb-10 font-light leading-relaxed">
            Каждое изделие — это ручная работа из натуральных ингредиентов. Доставляем свежим в день заказа.
          </p>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => onNavigate('catalog')}
              className="bg-foreground text-background px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:opacity-80 transition-opacity"
            >
              Смотреть каталог
            </button>
            <button
              onClick={() => onNavigate('profile')}
              className="border border-foreground text-foreground px-8 py-3.5 rounded-full text-sm font-medium tracking-wide hover:bg-foreground hover:text-background transition-all"
            >
              Моя бонусная карта
            </button>
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted-foreground animate-bounce">
          <Icon name="ChevronDown" size={20} />
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-secondary/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: 'Sparkles', title: 'Ручная работа', text: 'Каждое изделие создаётся вручную' },
              { icon: 'Leaf', title: 'Без консервантов', text: 'Только натуральные ингредиенты' },
              { icon: 'Clock', title: 'Свежесть', text: 'Готовим в день заказа' },
              { icon: 'Gift', title: 'Подарочная упаковка', text: 'Фирменные коробки в подарок' },
            ].map((f, i) => (
              <div key={i} className="text-center" style={{ animationDelay: `${i * 0.1}s` }}>
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-background mb-4 border border-border">
                  <Icon name={f.icon} size={20} className="text-foreground" />
                </div>
                <h3 className="text-sm font-semibold mb-1">{f.title}</h3>
                <p className="text-xs text-muted-foreground">{f.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Hits */}
      <section className="py-20">
        <div className="container mx-auto px-6">
          <div className="flex items-end justify-between mb-12">
            <div>
              <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">Наши бестселлеры</p>
              <h2 className="font-serif text-4xl md:text-5xl font-light" style={{ fontFamily: 'Cormorant, serif' }}>
                Хиты сезона
              </h2>
            </div>
            <button
              onClick={() => onNavigate('catalog')}
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors"
            >
              Все позиции <Icon name="ArrowRight" size={14} />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {hits.map(product => (
              <ProductCard key={product.id} product={product} onSelect={onSelectProduct} />
            ))}
          </div>
        </div>
      </section>

      {/* Bonus banner */}
      <section className="py-16 mx-6 mb-16 rounded-3xl overflow-hidden relative" style={{ background: 'linear-gradient(135deg, hsl(25,35%,28%) 0%, hsl(22,45%,38%) 50%, hsl(38,50%,45%) 100%)' }}>
        <div className="relative z-10 container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left">
            <p className="text-xs tracking-[0.25em] uppercase text-white/60 mb-3">Программа лояльности</p>
            <h2 className="font-serif text-4xl md:text-5xl font-light text-white mb-4" style={{ fontFamily: 'Cormorant, serif' }}>
              Бонусная карта
            </h2>
            <p className="text-white/70 text-sm max-w-sm font-light leading-relaxed">
              Накапливайте баллы с каждой покупки. 5% от суммы заказа возвращается бонусами, которыми можно оплатить следующий заказ.
            </p>
          </div>
          <div className="flex flex-col items-center gap-4">
            <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 min-w-64">
              <p className="text-white/60 text-xs mb-1">Ваш баланс</p>
              <p className="text-white text-3xl font-light font-serif" style={{ fontFamily: 'Cormorant, serif' }}>1 240 ₽</p>
              <div className="mt-4 pt-4 border-t border-white/20 flex items-center justify-between">
                <span className="text-white/60 text-xs">**** **** **** 8847</span>
                <Icon name="CreditCard" size={16} className="text-white/60" />
              </div>
            </div>
            <button
              onClick={() => onNavigate('profile')}
              className="bg-white text-foreground px-6 py-2.5 rounded-full text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Моя карта
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}