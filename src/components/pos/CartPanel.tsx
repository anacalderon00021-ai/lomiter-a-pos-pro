import React from 'react';
import { useCart } from '@/context/CartContext';
import { Button } from '@/components/ui/button';
import { Minus, Plus, Trash2, ShoppingBag, Receipt, FileText, Store, Package, Truck } from 'lucide-react';
import { cn } from '@/lib/utils';
import { OrderType } from '@/types';

const orderTypeOptions: { type: OrderType; label: string; icon: React.ReactNode }[] = [
  { type: 'salon', label: 'Salón', icon: <Store className="w-4 h-4" /> },
  { type: 'takeaway', label: 'Para llevar', icon: <Package className="w-4 h-4" /> },
  { type: 'delivery', label: 'Delivery', icon: <Truck className="w-4 h-4" /> },
];

export default function CartPanel() {
  const {
    items,
    orderType,
    setOrderType,
    removeItem,
    updateQuantity,
    subtotal,
    tax,
    deliveryFee,
    total,
    clearCart,
  } = useCart();

  return (
    <div className="h-full flex flex-col glass rounded-2xl overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-display font-semibold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            Pedido Actual
          </h2>
          {items.length > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearCart}
              className="text-muted-foreground hover:text-destructive"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Order Type Selector */}
        <div className="flex gap-2">
          {orderTypeOptions.map((option) => (
            <button
              key={option.type}
              onClick={() => setOrderType(option.type)}
              className={cn(
                "flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-sm font-medium transition-all duration-200",
                orderType === option.type
                  ? "bg-primary text-primary-foreground"
                  : "bg-secondary hover:bg-secondary/80 text-foreground"
              )}
            >
              {option.icon}
              <span className="hidden sm:inline">{option.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground">
            <ShoppingBag className="w-12 h-12 mb-3 opacity-50" />
            <p className="text-sm">El carrito está vacío</p>
            <p className="text-xs mt-1">Agrega productos para comenzar</p>
          </div>
        ) : (
          items.map((item) => (
            <div
              key={item.id}
              className="flex gap-3 p-3 rounded-xl bg-secondary/50 animate-slide-up"
            >
              <img
                src={item.product.image}
                alt={item.product.name}
                className="w-16 h-16 rounded-lg object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm text-foreground truncate">
                  {item.product.name}
                </h4>
                {item.selectedExtras.length > 0 && (
                  <p className="text-xs text-muted-foreground truncate">
                    + {item.selectedExtras.map((e) => e.name).join(', ')}
                  </p>
                )}
                {item.notes && (
                  <p className="text-xs text-primary italic truncate">
                    "{item.notes}"
                  </p>
                )}
                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-semibold text-primary">
                    ${(
                      (item.product.price +
                        item.selectedExtras.reduce((sum, e) => sum + e.price, 0)) *
                      item.quantity
                    ).toLocaleString()}
                  </span>
                  <div className="flex items-center gap-1">
                    <Button
                      size="icon-sm"
                      variant="secondary"
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    >
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center text-sm font-medium">
                      {item.quantity}
                    </span>
                    <Button
                      size="icon-sm"
                      variant="secondary"
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    >
                      <Plus className="w-3 h-3" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Totals & Actions */}
      <div className="p-4 border-t border-border bg-card/50">
        <div className="space-y-2 mb-4">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="text-foreground">${subtotal.toLocaleString()}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">IVA (21%)</span>
            <span className="text-foreground">${tax.toLocaleString()}</span>
          </div>
          {deliveryFee > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Delivery</span>
              <span className="text-foreground">${deliveryFee.toLocaleString()}</span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
            <span>Total</span>
            <span className="text-primary">${total.toLocaleString()}</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <Button
            variant="glass"
            className="flex items-center gap-2"
            disabled={items.length === 0}
          >
            <Receipt className="w-4 h-4" />
            Ticket
          </Button>
          <Button
            variant="premium"
            className="flex items-center gap-2"
            disabled={items.length === 0}
          >
            <FileText className="w-4 h-4" />
            Cobrar
          </Button>
        </div>
      </div>
    </div>
  );
}
