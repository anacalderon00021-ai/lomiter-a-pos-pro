import React, { useState } from 'react';
import { Package, Plus, Search, Edit, Trash2, ToggleLeft, ToggleRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { products, categories } from '@/data/products';

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="h-screen flex flex-col p-4 lg:p-6">
      {/* Header */}
      <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl lg:text-3xl font-display font-bold text-foreground flex items-center gap-3">
            <Package className="w-8 h-8 text-primary" />
            Gestión de Productos
          </h1>
          <p className="text-muted-foreground text-sm mt-1">
            {products.length} productos registrados
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 lg:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar producto..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="premium" className="gap-2">
            <Plus className="w-4 h-4" />
            Nuevo
          </Button>
        </div>
      </header>

      {/* Products Grid */}
      <div className="flex-1 overflow-auto custom-scrollbar">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredProducts.map((product) => (
            <div key={product.id} className="glass rounded-2xl overflow-hidden group">
              <div className="relative h-32 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                <div className="absolute top-2 right-2 flex gap-1">
                  {product.isAvailable ? (
                    <span className="px-2 py-1 rounded-full bg-success/90 text-success-foreground text-xs font-medium">
                      Activo
                    </span>
                  ) : (
                    <span className="px-2 py-1 rounded-full bg-destructive/90 text-destructive-foreground text-xs font-medium">
                      Inactivo
                    </span>
                  )}
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">{product.name}</h3>
                    <p className="text-xs text-muted-foreground capitalize">{product.category}</p>
                  </div>
                  <span className="text-lg font-bold text-primary">
                    ${product.price.toLocaleString()}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                  {product.description}
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="secondary" size="sm" className="flex-1 gap-1">
                    <Edit className="w-3.5 h-3.5" />
                    Editar
                  </Button>
                  <Button variant="ghost" size="icon-sm">
                    {product.isAvailable ? (
                      <ToggleRight className="w-5 h-5 text-success" />
                    ) : (
                      <ToggleLeft className="w-5 h-5 text-muted-foreground" />
                    )}
                  </Button>
                  <Button variant="ghost" size="icon-sm" className="text-destructive">
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
