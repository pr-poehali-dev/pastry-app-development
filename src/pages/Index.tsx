import { useState } from 'react';
import { Product } from '@/data/products';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HomePage from './HomePage';
import CatalogPage from './CatalogPage';
import ProductPage from './ProductPage';
import CartPage from './CartPage';
import ProfilePage from './ProfilePage';
import AboutPage from './AboutPage';
import ContactsPage from './ContactsPage';

type Page = 'home' | 'catalog' | 'product' | 'cart' | 'profile' | 'about' | 'contacts' | 'checkout';

export default function Index() {
  const [page, setPage] = useState<Page>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [prevPage, setPrevPage] = useState<Page>('catalog');

  const navigate = (target: string) => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setPage(target as Page);
  };

  const selectProduct = (product: Product) => {
    setSelectedProduct(product);
    setPrevPage(page as Page);
    setPage('product');
  };

  const showFooter = page !== 'cart';

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar currentPage={page} onNavigate={navigate} />

      <main className="flex-1">
        {page === 'home' && (
          <HomePage onNavigate={navigate} onSelectProduct={selectProduct} />
        )}
        {page === 'catalog' && (
          <CatalogPage onSelectProduct={selectProduct} />
        )}
        {page === 'product' && selectedProduct && (
          <ProductPage
            product={selectedProduct}
            onBack={() => navigate(prevPage)}
            onNavigate={navigate}
          />
        )}
        {page === 'cart' && (
          <CartPage onNavigate={navigate} />
        )}
        {page === 'profile' && (
          <ProfilePage onNavigate={navigate} />
        )}
        {page === 'about' && (
          <AboutPage />
        )}
        {page === 'contacts' && (
          <ContactsPage />
        )}
        {page === 'checkout' && (
          <div className="min-h-screen pt-32 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
              <span className="text-4xl">🎂</span>
            </div>
            <h2
              className="font-serif text-4xl font-light mb-3"
              style={{ fontFamily: 'Cormorant, serif' }}
            >
              Заказ оформлен!
            </h2>
            <p className="text-muted-foreground text-sm mb-8 max-w-sm">
              Мы получили ваш заказ и уже начинаем его готовить. Статус можно отслеживать в личном кабинете.
            </p>
            <div className="flex gap-4">
              <button
                onClick={() => navigate('profile')}
                className="bg-foreground text-background px-6 py-3 rounded-full text-sm font-medium hover:opacity-80 transition-opacity"
              >
                Отследить заказ
              </button>
              <button
                onClick={() => navigate('catalog')}
                className="border border-foreground text-foreground px-6 py-3 rounded-full text-sm font-medium hover:bg-foreground hover:text-background transition-all"
              >
                Продолжить покупки
              </button>
            </div>
          </div>
        )}
      </main>

      {showFooter && <Footer onNavigate={navigate} />}
    </div>
  );
}
