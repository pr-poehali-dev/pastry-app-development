import { Product } from '@/data/products';
import { addToCart } from '@/store/useStore';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ProductPageProps {
  product: Product;
  onBack: () => void;
  onNavigate: (page: string) => void;
}

export default function ProductPage({ product, onBack, onNavigate }: ProductPageProps) {
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const bonusPoints = Math.floor(product.price * quantity * 0.05);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-muted-foreground hover:text-foreground text-sm mb-8 transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          Назад в каталог
        </button>

        <div className="grid md:grid-cols-2 gap-12 animate-fade-in">
          {/* Image */}
          <div className="relative rounded-3xl overflow-hidden aspect-square">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.badge && (
              <span className="absolute top-4 left-4 bg-foreground text-background text-xs font-medium tracking-wider px-3 py-1.5 rounded-full">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col justify-center">
            <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-3">{product.weight}</p>
            <h1 className="font-serif text-4xl md:text-5xl font-light mb-4" style={{ fontFamily: 'Cormorant, serif' }}>
              {product.name}
            </h1>
            <p className="text-muted-foreground text-sm leading-relaxed mb-8">{product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-3xl font-semibold">{(product.price * quantity).toLocaleString()} ₽</span>
              {product.oldPrice && (
                <span className="text-muted-foreground line-through text-lg">{(product.oldPrice * quantity).toLocaleString()} ₽</span>
              )}
            </div>

            {/* Bonus hint */}
            <div className="flex items-center gap-2 text-xs text-muted-foreground mb-8 bg-secondary/50 px-4 py-2.5 rounded-xl w-fit">
              <Icon name="Star" size={13} className="text-amber-600" />
              <span>+{bonusPoints} бонусных баллов за этот заказ</span>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center border border-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-4 py-3 hover:bg-secondary transition-colors"
                >
                  <Icon name="Minus" size={14} />
                </button>
                <span className="px-5 py-3 text-sm font-medium min-w-12 text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-4 py-3 hover:bg-secondary transition-colors"
                >
                  <Icon name="Plus" size={14} />
                </button>
              </div>
              <button
                onClick={handleAdd}
                className={`flex-1 py-3.5 rounded-xl text-sm font-medium transition-all ${
                  added
                    ? 'bg-green-600 text-white'
                    : 'bg-foreground text-background hover:opacity-80'
                }`}
              >
                {added ? '✓ Добавлено в корзину' : 'Добавить в корзину'}
              </button>
            </div>

            <button
              onClick={() => { handleAdd(); onNavigate('cart'); }}
              className="w-full border border-foreground text-foreground py-3.5 rounded-xl text-sm font-medium hover:bg-foreground hover:text-background transition-all"
            >
              Купить сейчас
            </button>

            {/* Details */}
            {(product.ingredients || product.allergens) && (
              <div className="mt-10 pt-8 border-t border-border space-y-3">
                {product.ingredients && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Состав</p>
                    <p className="text-sm text-foreground">{product.ingredients}</p>
                  </div>
                )}
                {product.allergens && (
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">Аллергены</p>
                    <p className="text-sm text-foreground">{product.allergens}</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
