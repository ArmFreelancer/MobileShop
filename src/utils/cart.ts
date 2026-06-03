import { load, store } from './storage';
import type { CartItem, Phone } from '../types';

const CART_KEY = 'pm_cart';

export function loadCart(): CartItem[] { return load<CartItem[]>(CART_KEY, []); }
export function saveCart(c: CartItem[]) { store(CART_KEY, c); }

export function addToCart(cart: CartItem[], phone: Phone): CartItem[] {
  const index = cart.findIndex(x => x.id === phone.id);
  if (index >= 0) {
    const next = [...cart];
    next[index] = { ...next[index], qty: next[index].qty + 1 };
    return next;
  }
  return [...cart, { ...phone, qty: 1 }];
}

export function removeFromCart(cart: CartItem[], id: number): CartItem[] {
  return cart.filter(x => x.id !== id);
}

export function changeQty(cart: CartItem[], id: number, delta: number): CartItem[] {
  const index = cart.findIndex(x => x.id === id);
  if (index < 0) return cart;
  const next = [...cart];
  const newQty = next[index].qty + delta;
  if (newQty <= 0) {
    return cart.filter(x => x.id !== id);
  }
  next[index] = { ...next[index], qty: newQty };
  return next;
}

export function clearCart(): CartItem[] {
  return [];
}

export function cartTotal(cart: CartItem[]): number {
  return cart.reduce((s, c) => s + c.price * c.qty, 0);
}

export function cartCount(cart: CartItem[]): number {
  return cart.reduce((s, c) => s + c.qty, 0);
}
