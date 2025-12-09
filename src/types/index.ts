export type UserRole = 'owner' | 'manager' | 'cashier' | 'kitchen' | 'delivery' | 'employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: ProductCategory;
  extras?: ProductExtra[];
  isCombo?: boolean;
  isBestSeller?: boolean;
  isAvailable: boolean;
  preparationTime?: number;
}

export type ProductCategory = 
  | 'lomitos' 
  | 'hamburguesas' 
  | 'panchos' 
  | 'papas' 
  | 'bebidas' 
  | 'combos' 
  | 'extras';

export interface ProductExtra {
  id: string;
  name: string;
  price: number;
}

export interface CartItem {
  id: string;
  product: Product;
  quantity: number;
  selectedExtras: ProductExtra[];
  notes?: string;
}

export type OrderType = 'salon' | 'takeaway' | 'delivery';

export type PaymentMethod = 'cash' | 'card' | 'transfer' | 'mixed';

export interface Order {
  id: string;
  items: CartItem[];
  orderType: OrderType;
  paymentMethod?: PaymentMethod;
  tableNumber?: number;
  customerName?: string;
  customerPhone?: string;
  customerAddress?: string;
  deliveryFee?: number;
  subtotal: number;
  tax: number;
  total: number;
  status: OrderStatus;
  createdAt: Date;
  cashierName: string;
}

export type OrderStatus = 
  | 'pending' 
  | 'preparing' 
  | 'ready' 
  | 'delivered' 
  | 'completed' 
  | 'cancelled';

export interface Employee {
  id: string;
  name: string;
  document: string;
  role: UserRole;
  phone: string;
  shift: string;
  salary?: number;
}

export interface AttendanceRecord {
  id: string;
  employeeId: string;
  date: Date;
  checkIn?: Date;
  checkOut?: Date;
  hoursWorked?: number;
  status: 'present' | 'absent' | 'late';
}
