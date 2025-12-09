import React from 'react';
import { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { Plus, Star, Clock, Flame } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  onSelectProduct?: (product: Product) => void;
}

export default function ProductCard({ product, onSelectProduct }: ProductCardProps) {
  const { addItem } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(product);
    toast.success(`${product.name} agregado`, {
      description: `$${product.price.toLocaleString()}`,
      duration: 2000,
    });
  };

  const handleClick = () => {
    if (onSelectProduct) {
      onSelectProduct(product);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="premium-card group cursor-pointer overflow-hidden"
    >
      {/* Image Container */}
      <div className="relative h-36 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex gap-1.5">
          {product.isBestSeller && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-primary/90 text-primary-foreground text-xs font-medium">
              <Flame className="w-3 h-3" />
              Popular
            </span>
          )}
          {product.isCombo && (
            <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-warning/90 text-warning-foreground text-xs font-medium">
              <Star className="w-3 h-3" />
              Combo
            </span>
          )}
        </div>

        {/* Quick Add Button */}
        <Button
          onClick={handleQuickAdd}
          size="icon"
          variant="premium"
          className="absolute bottom-2 right-2 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
        >
          <Plus className="w-5 h-5" />
        </Button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3 className="font-semibold text-foreground text-base mb-1 line-clamp-1">
          {product.name}
        </h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3 min-h-[2.5rem]">
          {product.description}
        </p>
        
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${product.price.toLocaleString()}
          </span>
          {product.preparationTime && (
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              {product.preparationTime} min
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
