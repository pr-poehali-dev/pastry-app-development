import { useState } from 'react';
import Icon from '@/components/ui/icon';

export default function ContactsPage() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="mb-12 animate-fade-in">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Мы рядом</p>
          <h1 className="font-serif text-6xl font-light" style={{ fontFamily: 'Cormorant, serif' }}>
            Контакты
          </h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Info */}
          <div className="space-y-10 animate-fade-in">
            <div>
              <img
                src="https://cdn.poehali.dev/projects/f8461a91-e604-4cbf-ae81-0336a38d0fe2/files/161a7e46-1ad3-4538-971a-df529664ead2.jpg"
                alt="Кондитерская"
                className="w-full aspect-video object-cover rounded-2xl mb-8"
              />
            </div>

            <div className="grid gap-6">
              {[
                {
                  icon: 'MapPin',
                  label: 'Адрес',
                  value: 'ул. Пушкина, 12\nМосква, 101000',
                },
                {
                  icon: 'Clock',
                  label: 'Время работы',
                  value: 'Пн–Пт: 9:00 – 20:00\nСб–Вс: 10:00 – 19:00',
                },
                {
                  icon: 'Phone',
                  label: 'Телефон',
                  value: '+7 (495) 123-45-67',
                },
                {
                  icon: 'Mail',
                  label: 'Email',
                  value: 'hello@patisserie.ru',
                },
              ].map((c, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={16} className="text-foreground" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">{c.label}</p>
                    <p className="text-sm whitespace-pre-line">{c.value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-4">
              {[
                { icon: 'MessageCircle', label: 'Telegram' },
                { icon: 'Instagram', label: 'Instagram' },
                { icon: 'Phone', label: 'WhatsApp' },
              ].map((s, i) => (
                <button
                  key={i}
                  className="flex items-center gap-2 bg-secondary hover:bg-border transition-colors px-4 py-2.5 rounded-xl text-sm"
                >
                  <Icon name={s.icon} size={14} />
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="animate-slide-in-right">
            <div className="bg-card rounded-2xl p-8 border border-border">
              {sent ? (
                <div className="text-center py-12 animate-scale-in">
                  <div className="w-16 h-16 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
                    <Icon name="CheckCircle" size={32} className="text-green-600" />
                  </div>
                  <h3 className="font-serif text-2xl font-light mb-2" style={{ fontFamily: 'Cormorant, serif' }}>
                    Сообщение отправлено!
                  </h3>
                  <p className="text-muted-foreground text-sm">Мы свяжемся с вами в течение 2 часов</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Отправить ещё
                  </button>
                </div>
              ) : (
                <>
                  <h2 className="font-serif text-3xl font-light mb-2" style={{ fontFamily: 'Cormorant, serif' }}>
                    Напишите нам
                  </h2>
                  <p className="text-muted-foreground text-sm mb-8">Ответим в течение 2 часов в рабочее время</p>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2">
                        Ваше имя
                      </label>
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={e => setForm({ ...form, name: e.target.value })}
                        placeholder="Анна"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2">
                        Телефон
                      </label>
                      <input
                        type="tel"
                        required
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                        placeholder="+7 (___) ___-__-__"
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-2">
                        Сообщение
                      </label>
                      <textarea
                        required
                        value={form.message}
                        onChange={e => setForm({ ...form, message: e.target.value })}
                        placeholder="Хочу заказать торт на день рождения..."
                        rows={5}
                        className="w-full px-4 py-3 bg-background border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 placeholder:text-muted-foreground resize-none"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-foreground text-background py-4 rounded-xl font-medium hover:opacity-80 transition-opacity"
                    >
                      Отправить сообщение
                    </button>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
