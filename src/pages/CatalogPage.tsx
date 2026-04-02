import { useState } from 'react';
import { products, categories, Product } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import Icon from '@/components/ui/icon';

interface CatalogPageProps {
  onSelectProduct: (product: Product) => void;
}

export default function CatalogPage({ onSelectProduct }: CatalogPageProps) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const filtered = products.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen pt-24 pb-16">
      <div className="container mx-auto px-6">
        <div className="mb-10 animate-fade-in">
          <p className="text-xs tracking-[0.25em] uppercase text-muted-foreground mb-2">Всё для вашего стола</p>
          <h1 className="font-serif text-5xl font-light mb-8" style={{ fontFamily: 'Cormorant, serif' }}>
            Каталог
          </h1>
          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Icon name="Search" size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="Поиск по названию..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-3 bg-card border border-border rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-foreground/30 placeholder:text-muted-foreground"
            />
          </div>
          {/* Categories */}
          <div className="flex flex-wrap gap-2">
            {categories.map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
                  activeCategory === cat.id
                    ? 'bg-foreground text-background'
                    : 'bg-secondary text-foreground hover:bg-border'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <Icon name="Search" size={40} className="text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Ничего не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product, i) => (
              <div key={product.id} className="animate-fade-in" style={{ animationDelay: `${i * 0.05}s` }}>
                <ProductCard product={product} onSelect={onSelectProduct} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
