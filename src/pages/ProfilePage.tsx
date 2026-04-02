import { mockUser, STATUS_LABELS } from '@/store/useStore';
import Icon from '@/components/ui/icon';
import { useState } from 'react';

interface ProfilePageProps {
  onNavigate: (page: string) => void;
}

const STATUS_COLORS = {
  processing: 'bg-yellow-100 text-yellow-800',
  baking: 'bg-orange-100 text-orange-800',
  delivery: 'bg-blue-100 text-blue-800',
  delivered: 'bg-green-100 text-green-800',
};

const STATUS_ICONS = {
  processing: 'Clock',
  baking: 'Flame',
  delivery: 'Truck',
  delivered: 'CheckCircle',
};

const STEPS = ['processing', 'baking', 'delivery', 'delivered'] as const;

export default function ProfilePage({ onNavigate }: ProfilePageProps) {
  const [activeOrder, setActiveOrder] = useState<string | null>(null);
  const user = mockUser;
  const percentage = Math.min((user.bonusPoints / 5000) * 100, 100);

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="mb-10 animate-fade-in">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Личный кабинет</p>
          <h1 className="font-serif text-5xl font-light" style={{ fontFamily: 'Cormorant, serif' }}>
            Привет, {user.name.split(' ')[0]}
          </h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Left col */}
          <div className="space-y-6">
            {/* Profile info */}
            <div className="bg-card rounded-2xl p-6 border border-border">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center">
                  <Icon name="User" size={28} className="text-muted-foreground" />
                </div>
                <div>
                  <h2 className="font-semibold">{user.name}</h2>
                  <p className="text-sm text-muted-foreground">{user.phone}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
              </div>
              <button className="w-full border border-border text-sm py-2.5 rounded-xl hover:bg-secondary transition-colors">
                Редактировать профиль
              </button>
            </div>

            {/* Bonus card */}
            <div className="rounded-2xl overflow-hidden" style={{ background: 'linear-gradient(135deg, hsl(25,35%,28%) 0%, hsl(22,45%,38%) 50%, hsl(38,50%,45%) 100%)' }}>
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <p className="text-white/70 text-xs tracking-[0.2em] uppercase">Бонусная карта</p>
                  <Icon name="CreditCard" size={18} className="text-white/50" />
                </div>
                <div className="mb-6">
                  <p className="text-white/60 text-xs mb-1">Баланс баллов</p>
                  <p className="text-white font-serif text-4xl font-light" style={{ fontFamily: 'Cormorant, serif' }}>
                    {user.bonusPoints.toLocaleString()}
                  </p>
                  <p className="text-white/60 text-xs mt-1">= {user.bonusPoints.toLocaleString()} ₽ к оплате</p>
                </div>

                {/* Progress to next tier */}
                <div className="mb-4">
                  <div className="flex justify-between text-white/60 text-xs mb-2">
                    <span>До VIP статуса</span>
                    <span>{user.bonusPoints} / 5000</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-white/70 rounded-full transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-white/20 flex items-center justify-between">
                  <p className="text-white/60 text-xs font-mono tracking-widest">
                    {user.cardNumber}
                  </p>
                </div>
              </div>
            </div>

            {/* How bonuses work */}
            <div className="bg-secondary/40 rounded-2xl p-5 border border-border">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Icon name="Info" size={14} />
                Как работают бонусы
              </h3>
              <ul className="space-y-2 text-xs text-muted-foreground">
                <li className="flex gap-2">
                  <Icon name="Star" size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  5% от суммы каждого заказа начисляется бонусами
                </li>
                <li className="flex gap-2">
                  <Icon name="Star" size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  1 балл = 1 рубль при оплате
                </li>
                <li className="flex gap-2">
                  <Icon name="Star" size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  Можно списать до 30% стоимости заказа
                </li>
                <li className="flex gap-2">
                  <Icon name="Star" size={12} className="text-amber-600 mt-0.5 flex-shrink-0" />
                  VIP от 5000 баллов — кэшбэк 10%
                </li>
              </ul>
            </div>
          </div>

          {/* Orders */}
          <div className="lg:col-span-2">
            <h2 className="font-serif text-3xl font-light mb-6" style={{ fontFamily: 'Cormorant, serif' }}>
              Мои заказы
            </h2>
            <div className="space-y-4">
              {user.orders.map(order => (
                <div key={order.id} className="bg-card rounded-2xl border border-border overflow-hidden">
                  <button
                    onClick={() => setActiveOrder(activeOrder === order.id ? null : order.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-secondary/30 transition-colors text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div>
                        <p className="font-semibold text-sm">{order.id}</p>
                        <p className="text-xs text-muted-foreground">{order.date}</p>
                      </div>
                      <span className={`text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1.5 ${STATUS_COLORS[order.status]}`}>
                        <Icon name={STATUS_ICONS[order.status]} size={11} />
                        {STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-semibold">{order.total.toLocaleString()} ₽</span>
                      <Icon name={activeOrder === order.id ? 'ChevronUp' : 'ChevronDown'} size={16} className="text-muted-foreground" />
                    </div>
                  </button>

                  {activeOrder === order.id && (
                    <div className="px-5 pb-5 border-t border-border animate-fade-in">
                      {/* Tracking */}
                      <div className="py-5">
                        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">
                          Статус заказа
                        </p>
                        <div className="relative">
                          <div className="absolute top-4 left-4 right-4 h-0.5 bg-border" />
                          <div
                            className="absolute top-4 left-4 h-0.5 bg-foreground transition-all"
                            style={{ width: `${(STEPS.indexOf(order.status) / (STEPS.length - 1)) * 100}%` }}
                          />
                          <div className="relative flex justify-between">
                            {STEPS.map((step, i) => {
                              const done = STEPS.indexOf(order.status) >= i;
                              return (
                                <div key={step} className="flex flex-col items-center gap-2">
                                  <div className={`w-8 h-8 rounded-full border-2 flex items-center justify-center z-10 transition-all ${
                                    done
                                      ? 'bg-foreground border-foreground'
                                      : 'bg-background border-border'
                                  }`}>
                                    <Icon
                                      name={STATUS_ICONS[step]}
                                      size={14}
                                      className={done ? 'text-background' : 'text-muted-foreground'}
                                    />
                                  </div>
                                  <span className="text-[10px] text-muted-foreground text-center max-w-16">
                                    {STATUS_LABELS[step]}
                                  </span>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border text-sm">
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Адрес</p>
                          <p>{order.address}</p>
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground mb-0.5">Начислено бонусов</p>
                          <p className="text-amber-700 font-medium">+{order.bonusEarned} ₽</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              <button
                onClick={() => onNavigate('catalog')}
                className="w-full border border-dashed border-border rounded-2xl py-8 text-muted-foreground hover:border-foreground hover:text-foreground transition-all text-sm flex items-center justify-center gap-2"
              >
                <Icon name="Plus" size={16} />
                Сделать новый заказ
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
