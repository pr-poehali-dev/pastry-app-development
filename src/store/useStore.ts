import { useState, useEffect } from 'react';
import { Product } from '@/data/products';

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface UserProfile {
  name: string;
  phone: string;
  email: string;
  bonusPoints: number;
  cardNumber: string;
  orders: Order[];
}

export interface Order {
  id: string;
  date: string;
  status: 'processing' | 'baking' | 'delivery' | 'delivered';
  items: CartItem[];
  total: number;
  address: string;
  deliveryCost: number;
  bonusEarned: number;
}

const STATUS_LABELS = {
  processing: 'Обрабатывается',
  baking: 'Готовится',
  delivery: 'В доставке',
  delivered: 'Доставлен',
};

let cartItems: CartItem[] = [];
let listeners: (() => void)[] = [];

function notifyListeners() {
  listeners.forEach(l => l());
}

export function getCartItems() {
  return cartItems;
}

export function addToCart(product: Product) {
  const existing = cartItems.find(i => i.product.id === product.id);
  if (existing) {
    cartItems = cartItems.map(i =>
      i.product.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
    );
  } else {
    cartItems = [...cartItems, { product, quantity: 1 }];
  }
  notifyListeners();
}

export function removeFromCart(productId: number) {
  cartItems = cartItems.filter(i => i.product.id !== productId);
  notifyListeners();
}

export function updateQuantity(productId: number, quantity: number) {
  if (quantity <= 0) {
    removeFromCart(productId);
    return;
  }
  cartItems = cartItems.map(i =>
    i.product.id === productId ? { ...i, quantity } : i
  );
  notifyListeners();
}

export function clearCart() {
  cartItems = [];
  notifyListeners();
}

export function getCartTotal() {
  return cartItems.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
}

export function getCartCount() {
  return cartItems.reduce((sum, i) => sum + i.quantity, 0);
}

export function useCart() {
  const [, forceUpdate] = useState(0);
  useEffect(() => {
    const listener = () => forceUpdate(n => n + 1);
    listeners.push(listener);
    return () => { listeners = listeners.filter(l => l !== listener); };
  }, []);
  return {
    items: cartItems,
    total: getCartTotal(),
    count: getCartCount(),
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
  };
}

export const mockUser: UserProfile = {
  name: 'Анна Смирнова',
  phone: '+7 (916) 123-45-67',
  email: 'anna@example.com',
  bonusPoints: 1240,
  cardNumber: '7834 2910 5523 8847',
  orders: [
    {
      id: '#10042',
      date: '28 марта 2026',
      status: 'delivered',
      items: [{ product: {} as Product, quantity: 1 }],
      total: 3400,
      address: 'ул. Пушкина, д. 10, кв. 5',
      deliveryCost: 0,
      bonusEarned: 170,
    },
    {
      id: '#10089',
      date: '1 апреля 2026',
      status: 'delivery',
      items: [{ product: {} as Product, quantity: 2 }],
      total: 1960,
      address: 'ул. Тверская, д. 22, кв. 88',
      deliveryCost: 200,
      bonusEarned: 98,
    },
  ],
};

export { STATUS_LABELS };
