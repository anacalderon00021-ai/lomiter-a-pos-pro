import React, { createContext, useContext, useState, ReactNode } from 'react';
import { CartItem, Product, ProductExtra, OrderType } from '@/types';

interface CartContextType {
  items: CartItem[];
  orderType: OrderType;
  tableNumber?: number;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  deliveryFee: number;
  addItem: (product: Product, extras?: ProductExtra[], notes?: string) => void;
  removeItem: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  setOrderType: (type: OrderType) => void;
  setTableNumber: (num: number) => void;
  setCustomerInfo: (name: string, phone: string, address?: string) => void;
  subtotal: number;
  tax: number;
  total: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const TAX_RATE = 0.21; // 21% IVA
const DELIVERY_FEE = 500;

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<OrderType>('salon');
  const [tableNumber, setTableNumber] = useState<number>();
  const [customerName, setCustomerName] = useState<string>('');
  const [customerPhone, setCustomerPhone] = useState<string>('');
  const [customerAddress, setCustomerAddress] = useState<string>('');

  const deliveryFee = orderType === 'delivery' ? DELIVERY_FEE : 0;

  const addItem = (product: Product, extras: ProductExtra[] = [], notes?: string) => {
    const newItem: CartItem = {
      id: `${product.id}-${Date.now()}`,
      product,
      quantity: 1,
      selectedExtras: extras,
      notes,
    };
    setItems(prev => [...prev, newItem]);
  };

  const removeItem = (itemId: string) => {
    setItems(prev => prev.filter(item => item.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(itemId);
      return;
    }
    setItems(prev =>
      prev.map(item =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setTableNumber(undefined);
    setCustomerName('');
    setCustomerPhone('');
    setCustomerAddress('');
  };

  const setCustomerInfo = (name: string, phone: string, address?: string) => {
    setCustomerName(name);
    setCustomerPhone(phone);
    if (address) setCustomerAddress(address);
  };

  const subtotal = items.reduce((sum, item) => {
    const extrasPrice = item.selectedExtras.reduce((e, extra) => e + extra.price, 0);
    return sum + (item.product.price + extrasPrice) * item.quantity;
  }, 0);

  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax + deliveryFee;

  return (
    <CartContext.Provider
      value={{
        items,
        orderType,
        tableNumber,
        customerName,
        customerPhone,
        customerAddress,
        deliveryFee,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        setOrderType,
        setTableNumber: (num) => setTableNumber(num),
        setCustomerInfo,
        subtotal,
        tax,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
