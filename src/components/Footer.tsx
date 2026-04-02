interface FooterProps {
  onNavigate: (page: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-8 mb-10">
          <div className="md:col-span-2">
            <h3 className="font-serif text-2xl font-light mb-3" style={{ fontFamily: 'Cormorant, serif' }}>
              Patisserie
            </h3>
            <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">
              Авторская кондитерская. Создаём сладкие моменты с 2018 года.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Навигация</p>
            <ul className="space-y-2">
              {[
                { id: 'home', label: 'Главная' },
                { id: 'catalog', label: 'Каталог' },
                { id: 'about', label: 'О нас' },
                { id: 'contacts', label: 'Контакты' },
              ].map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => onNavigate(link.id)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">Контакты</p>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>ул. Пушкина, 12, Москва</li>
              <li>+7 (495) 123-45-67</li>
              <li>hello@patisserie.ru</li>
              <li>Пн–Вс: 9:00 – 20:00</li>
            </ul>
          </div>
        </div>
        <div className="pt-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <p>© 2026 Patisserie. Все права защищены.</p>
          <p>Политика конфиденциальности</p>
        </div>
      </div>
    </footer>
  );
}
