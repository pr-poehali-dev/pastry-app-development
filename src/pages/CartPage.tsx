import { useState } from 'react';
import { useCart } from '@/store/useStore';
import Icon from '@/components/ui/icon';

interface CartPageProps {
  onNavigate: (page: string) => void;
}

const DELIVERY_OPTIONS = [
  { id: 'courier', label: 'Курьером', description: 'Доставка в течение 2–3 часов', baseCost: 350 },
  { id: 'express', label: 'Экспресс', description: 'Доставка за 60 минут', baseCost: 590 },
  { id: 'pickup', label: 'Самовывоз', description: 'Адрес: ул. Пушкина, 12', baseCost: 0 },
];

const ZONES = [
  { label: 'Центр (до 5 км)', multiplier: 1 },
  { label: 'Ближнее Подмосковье (5–15 км)', multiplier: 1.4 },
  { label: 'Дальнее (15–30 км)', multiplier: 1.8 },
];

export default function CartPage({ onNavigate }: CartPageProps) {
  const { items, total, updateQuantity, removeFromCart } = useCart();
  const [deliveryType, setDeliveryType] = useState('courier');
  const [zone, setZone] = useState(0);
  const [bonusInput, setBonusInput] = useState('');
  const [bonusApplied, setBonusApplied] = useState(0);

  const selectedDelivery = DELIVERY_OPTIONS.find(d => d.id === deliveryType)!;
  const deliveryCost = Math.round(selectedDelivery.baseCost * ZONES[zone].multiplier);
  const bonusPoints = Math.floor((total + deliveryCost) * 0.05);
  const grandTotal = total + deliveryCost - bonusApplied;

  const applyBonus = () => {
    const val = parseInt(bonusInput);
    if (!isNaN(val) && val > 0 && val <= 1240) {
      setBonusApplied(Math.min(val, total));
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
        <Icon name="ShoppingBag" size={60} className="text-muted-foreground mb-6" />
        <h2 className="font-serif text-3xl font-light mb-3" style={{ fontFamily: 'Cormorant, serif' }}>
          Корзина пуста
        </h2>
        <p className="text-muted-foreground text-sm mb-8">Добавьте что-нибудь вкусное из каталога</p>
        <button
          onClick={() => onNavigate('catalog')}
          className="bg-foreground text-background px-8 py-3 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
        >
          Перейти в каталог
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="mb-8">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Ваш заказ</p>
          <h1 className="font-serif text-5xl font-light" style={{ fontFamily: 'Cormorant, serif' }}>Корзина</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {items.map(item => (
              <div key={item.product.id} className="flex items-center gap-4 bg-card rounded-2xl p-4 border border-border animate-fade-in">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-xl flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <h3 className="font-serif text-lg font-light truncate" style={{ fontFamily: 'Cormorant, serif' }}>
                    {item.product.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{item.product.weight}</p>
                </div>
                <div className="flex items-center border border-border rounded-xl">
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    className="px-3 py-2 hover:bg-secondary transition-colors rounded-l-xl"
                  >
                    <Icon name="Minus" size={12} />
                  </button>
                  <span className="px-3 text-sm font-medium">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    className="px-3 py-2 hover:bg-secondary transition-colors rounded-r-xl"
                  >
                    <Icon name="Plus" size={12} />
                  </button>
                </div>
                <span className="font-semibold text-sm min-w-20 text-right">
                  {(item.product.price * item.quantity).toLocaleString()} ₽
                </span>
                <button
                  onClick={() => removeFromCart(item.product.id)}
                  className="p-2 text-muted-foreground hover:text-destructive transition-colors"
                >
                  <Icon name="X" size={14} />
                </button>
              </div>
            ))}

            {/* Delivery */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <h2 className="font-semibold text-sm mb-4 flex items-center gap-2">
                <Icon name="Truck" size={16} />
                Способ доставки
              </h2>
              <div className="grid gap-3 mb-6">
                {DELIVERY_OPTIONS.map(opt => (
                  <label key={opt.id} className={`flex items-center justify-between p-4 rounded-xl border cursor-pointer transition-all ${
                    deliveryType === opt.id ? 'border-foreground bg-secondary/50' : 'border-border hover:border-muted-foreground'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="delivery"
                        value={opt.id}
                        checked={deliveryType === opt.id}
                        onChange={() => setDeliveryType(opt.id)}
                        className="accent-foreground"
                      />
                      <div>
                        <p className="text-sm font-medium">{opt.label}</p>
                        <p className="text-xs text-muted-foreground">{opt.description}</p>
                      </div>
                    </div>
                    <span className="text-sm font-semibold">
                      {opt.baseCost === 0 ? 'Бесплатно' : `от ${opt.baseCost} ₽`}
                    </span>
                  </label>
                ))}
              </div>

              {deliveryType !== 'pickup' && (
                <div>
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3">
                    Зона доставки
                  </h3>
                  <div className="grid gap-2">
                    {ZONES.map((z, i) => (
                      <label key={i} className={`flex items-center justify-between p-3 rounded-xl border cursor-pointer transition-all ${
                        zone === i ? 'border-foreground bg-secondary/50' : 'border-border hover:border-muted-foreground'
                      }`}>
                        <div className="flex items-center gap-3">
                          <input
                            type="radio"
                            name="zone"
                            checked={zone === i}
                            onChange={() => setZone(i)}
                            className="accent-foreground"
                          />
                          <span className="text-sm">{z.label}</span>
                        </div>
                        <span className="text-sm font-semibold">
                          {Math.round(selectedDelivery.baseCost * z.multiplier)} ₽
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-4">
            <div className="bg-card rounded-2xl p-6 border border-border sticky top-24">
              <h2 className="font-serif text-2xl font-light mb-6" style={{ fontFamily: 'Cormorant, serif' }}>
                Итого
              </h2>

              <div className="space-y-3 text-sm mb-6">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Товары</span>
                  <span>{total.toLocaleString()} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Доставка</span>
                  <span>{deliveryCost === 0 ? 'Бесплатно' : `${deliveryCost} ₽`}</span>
                </div>
                {bonusApplied > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Бонусы</span>
                    <span>−{bonusApplied} ₽</span>
                  </div>
                )}
                <div className="pt-3 border-t border-border flex justify-between font-semibold text-base">
                  <span>К оплате</span>
                  <span>{grandTotal.toLocaleString()} ₽</span>
                </div>
              </div>

              {/* Bonus */}
              <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                <p className="text-xs font-semibold mb-2 flex items-center gap-1.5">
                  <Icon name="Star" size={12} className="text-amber-600" />
                  Списать бонусы (доступно: 1 240 ₽)
                </p>
                <div className="flex gap-2">
                  <input
                    type="number"
                    placeholder="Сумма"
                    value={bonusInput}
                    onChange={e => setBonusInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm bg-card border border-border rounded-lg focus:outline-none focus:ring-1 focus:ring-foreground/30"
                  />
                  <button
                    onClick={applyBonus}
                    className="px-4 py-2 bg-foreground text-background text-sm rounded-lg hover:opacity-80 transition-opacity"
                  >
                    Применить
                  </button>
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  +{bonusPoints} баллов за этот заказ
                </p>
              </div>

              <button
                onClick={() => onNavigate('checkout')}
                className="w-full bg-foreground text-background py-4 rounded-xl font-medium hover:opacity-80 transition-opacity"
              >
                Оформить заказ
              </button>

              <button
                onClick={() => onNavigate('catalog')}
                className="w-full text-muted-foreground text-sm mt-3 py-2 hover:text-foreground transition-colors"
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
