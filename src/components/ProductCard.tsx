import { Product } from '@/data/products';
import { addToCart } from '@/store/useStore';
import Icon from '@/components/ui/icon';

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

export default function ProductCard({ product, onSelect }: ProductCardProps) {
  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <div
      className="hover-scale cursor-pointer bg-card rounded-2xl overflow-hidden border border-border group"
      onClick={() => onSelect(product)}
    >
      <div className="relative overflow-hidden aspect-square">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {product.badge && (
          <span className="absolute top-3 left-3 bg-foreground text-background text-[11px] font-medium tracking-wider px-2.5 py-1 rounded-full">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4">
        <p className="text-xs text-muted-foreground mb-1">{product.weight}</p>
        <h3 className="font-serif text-lg font-light leading-tight mb-2" style={{ fontFamily: 'Cormorant, serif' }}>
          {product.name}
        </h3>
        <p className="text-xs text-muted-foreground line-clamp-2 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-semibold">{product.price.toLocaleString()} ₽</span>
            {product.oldPrice && (
              <span className="text-xs text-muted-foreground line-through">{product.oldPrice.toLocaleString()} ₽</span>
            )}
          </div>
          <button
            onClick={handleAdd}
            className="flex items-center gap-1.5 bg-foreground text-background text-xs font-medium px-3 py-2 rounded-xl hover:opacity-80 transition-opacity"
          >
            <Icon name="Plus" size={13} />
            В корзину
          </button>
        </div>
      </div>
    </div>
  );
}
