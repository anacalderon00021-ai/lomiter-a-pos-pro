import React, { useState } from 'react';
import { Product, ProductExtra, ProductExclusion } from '@/types';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Checkbox } from '@/components/ui/checkbox';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Minus, ShoppingCart, Clock, X } from 'lucide-react';
import { toast } from 'sonner';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  const { addItem } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedExtras, setSelectedExtras] = useState<ProductExtra[]>([]);
  const [selectedExclusions, setSelectedExclusions] = useState<ProductExclusion[]>([]);
  const [notes, setNotes] = useState('');

  if (!product) return null;

  const handleExtraToggle = (extra: ProductExtra) => {
    setSelectedExtras(prev =>
      prev.find(e => e.id === extra.id)
        ? prev.filter(e => e.id !== extra.id)
        : [...prev, extra]
    );
  };

  const handleExclusionToggle = (exclusion: ProductExclusion) => {
    setSelectedExclusions(prev =>
      prev.find(e => e.id === exclusion.id)
        ? prev.filter(e => e.id !== exclusion.id)
        : [...prev, exclusion]
    );
  };

  const extrasTotal = selectedExtras.reduce((sum, e) => sum + e.price, 0);
  const itemTotal = (product.price + extrasTotal) * quantity;

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem(product, selectedExtras, selectedExclusions, notes || undefined);
    }
    toast.success(`${quantity}x ${product.name} agregado`, {
      description: `Total: $${itemTotal.toLocaleString()}`,
    });
    handleClose();
  };

  const handleClose = () => {
    setQuantity(1);
    setSelectedExtras([]);
    setSelectedExclusions([]);
    setNotes('');
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto bg-card border-border">
        <DialogHeader>
          <DialogTitle className="text-xl font-display">{product.name}</DialogTitle>
        </DialogHeader>

        {/* Product Image */}
        <div className="relative h-48 rounded-xl overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
          <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
            <span className="text-2xl font-bold text-primary">
              ${product.price.toLocaleString()}
            </span>
            {product.preparationTime && (
              <span className="flex items-center gap-1 text-sm text-muted-foreground bg-card/80 px-2 py-1 rounded-lg">
                <Clock className="w-4 h-4" />
                {product.preparationTime} min
              </span>
            )}
          </div>
        </div>

        <p className="text-muted-foreground text-sm">{product.description}</p>

        {/* Extras Section */}
        {product.extras && product.extras.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <Plus className="w-4 h-4 text-success" />
              Agregar extras
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {product.extras.map((extra) => (
                <label
                  key={extra.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedExtras.find(e => e.id === extra.id)
                      ? 'bg-primary/20 border border-primary/50'
                      : 'bg-secondary/50 border border-transparent hover:border-border'
                  }`}
                >
                  <Checkbox
                    checked={!!selectedExtras.find(e => e.id === extra.id)}
                    onCheckedChange={() => handleExtraToggle(extra)}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{extra.name}</p>
                    <p className="text-xs text-success">+${extra.price}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Exclusions Section */}
        {product.exclusions && product.exclusions.length > 0 && (
          <div className="space-y-3">
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <X className="w-4 h-4 text-destructive" />
              Quitar ingredientes
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {product.exclusions.map((exclusion) => (
                <label
                  key={exclusion.id}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${
                    selectedExclusions.find(e => e.id === exclusion.id)
                      ? 'bg-destructive/20 border border-destructive/50'
                      : 'bg-secondary/50 border border-transparent hover:border-border'
                  }`}
                >
                  <Checkbox
                    checked={!!selectedExclusions.find(e => e.id === exclusion.id)}
                    onCheckedChange={() => handleExclusionToggle(exclusion)}
                  />
                  <p className="text-sm font-medium text-foreground">{exclusion.name}</p>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Notes */}
        <div className="space-y-2">
          <h4 className="font-semibold text-foreground">Notas adicionales</h4>
          <Textarea
            placeholder="Ej: Bien cocido, sin sal, etc..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="resize-none"
            rows={2}
          />
        </div>

        {/* Quantity & Add to Cart */}
        <div className="flex items-center gap-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
            >
              <Minus className="w-4 h-4" />
            </Button>
            <span className="w-12 text-center text-lg font-bold">{quantity}</span>
            <Button
              variant="secondary"
              size="icon"
              onClick={() => setQuantity(quantity + 1)}
            >
              <Plus className="w-4 h-4" />
            </Button>
          </div>

          <Button
            variant="premium"
            size="lg"
            className="flex-1 gap-2"
            onClick={handleAddToCart}
          >
            <ShoppingCart className="w-5 h-5" />
            Agregar ${itemTotal.toLocaleString()}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
