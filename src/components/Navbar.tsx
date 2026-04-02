import Icon from '@/components/ui/icon';
import { useCart } from '@/store/useStore';

interface NavbarProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export default function Navbar({ currentPage, onNavigate }: NavbarProps) {
  const { count } = useCart();

  const links = [
    { id: 'home', label: 'Главная' },
    { id: 'catalog', label: 'Каталог' },
    { id: 'about', label: 'О нас' },
    { id: 'contacts', label: 'Контакты' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => onNavigate('home')}
          className="font-serif text-xl font-light tracking-widest uppercase text-foreground hover:opacity-70 transition-opacity"
          style={{ fontFamily: 'Cormorant, serif' }}
        >
          Patisserie
        </button>

        <nav className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`text-sm font-light tracking-wide transition-colors relative pb-0.5 ${
                currentPage === link.id
                  ? 'text-foreground after:absolute after:bottom-0 after:left-0 after:right-0 after:h-px after:bg-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <button
            onClick={() => onNavigate('profile')}
            className={`p-2 rounded-full transition-colors ${
              currentPage === 'profile' ? 'bg-secondary' : 'hover:bg-secondary'
            }`}
          >
            <Icon name="User" size={18} className="text-foreground" />
          </button>
          <button
            onClick={() => onNavigate('cart')}
            className={`p-2 rounded-full transition-colors relative ${
              currentPage === 'cart' ? 'bg-secondary' : 'hover:bg-secondary'
            }`}
          >
            <Icon name="ShoppingBag" size={18} className="text-foreground" />
            {count > 0 && (
              <span className="absolute -top-0.5 -right-0.5 bg-accent text-accent-foreground text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div className="md:hidden border-t border-border px-4 py-2 flex justify-around">
        {links.map(link => (
          <button
            key={link.id}
            onClick={() => onNavigate(link.id)}
            className={`text-xs py-1 px-2 transition-colors ${
              currentPage === link.id ? 'text-foreground font-medium' : 'text-muted-foreground'
            }`}
          >
            {link.label}
          </button>
        ))}
      </div>
    </header>
  );
}
