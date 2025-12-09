import React, { useState, useMemo } from 'react';
import { products } from '@/data/products';
import ProductCard from '@/components/pos/ProductCard';
import CategoryFilter from '@/components/pos/CategoryFilter';
import CartPanel from '@/components/pos/CartPanel';
import SearchBar from '@/components/pos/SearchBar';
import ProductModal from '@/components/pos/ProductModal';
import { useAuth } from '@/context/AuthContext';
import { Bell, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Product } from '@/types';

export default function POSPage() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { user } = useAuth();
  const { items } = useCart();

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory =
        selectedCategory === 'all' || product.category === selectedCategory;
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch && product.isAvailable;
    });
  }, [selectedCategory, searchQuery]);

  const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <div className="h-screen flex flex-col lg:flex-row">
        {/* Main Content - Products */}
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          {/* Header */}
          <header className="flex items-center justify-between p-4 lg:p-6 border-b border-border">
            <div>
              <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground">
                Punto de Venta
              </h1>
              <p className="text-muted-foreground text-sm mt-0.5">
                Hola, {user?.name} • {new Date().toLocaleDateString('es-AR', { weekday: 'long', day: 'numeric', month: 'long' })}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-primary rounded-full" />
              </Button>
              
              {/* Mobile Cart Button */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="premium" size="icon" className="lg:hidden relative">
                    <ShoppingCart className="w-5 h-5" />
                    {itemCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-5 h-5 bg-foreground text-background text-xs font-bold rounded-full flex items-center justify-center">
                        {itemCount}
                      </span>
                    )}
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-full sm:max-w-md p-0">
                  <CartPanel />
                </SheetContent>
              </Sheet>
            </div>
          </header>

          {/* Search & Categories */}
          <div className="p-4 lg:p-6 space-y-4">
            <SearchBar value={searchQuery} onChange={setSearchQuery} />
            <CategoryFilter
              selectedCategory={selectedCategory}
              onSelectCategory={setSelectedCategory}
            />
          </div>

          {/* Products Grid */}
          <div className="flex-1 overflow-y-auto px-4 lg:px-6 pb-24 lg:pb-6 custom-scrollbar">
            <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onSelectProduct={setSelectedProduct}
                />
              ))}
            </div>
            {filteredProducts.length === 0 && (
              <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                <p className="text-lg">No se encontraron productos</p>
                <p className="text-sm">Intenta con otra búsqueda o categoría</p>
              </div>
            )}
          </div>
        </div>

        {/* Cart Panel - Desktop Only */}
        <div className="hidden lg:block w-96 border-l border-border">
          <CartPanel />
        </div>
      </div>

      {/* Product Modal */}
      <ProductModal 
        product={selectedProduct}
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />
    </>
  );
}
