import { load, store } from './storage';
import type { CartItem, Phone } from '../types';

const CART_KEY = 'pm_cart';

export function loadCart(): CartItem[] { return load<CartItem[]>(CART_KEY, []); }
export function saveCart(c: CartItem[]) { store(CART_KEY, c); }

export function addToCart(cart: CartItem[], phone: Phone): CartItem[] {
  const next = [...cart];
  const exist = next.find(x => x.id === phone.id);
  if (exist) exist.qty++;
  else next.push({ ...phone, qty: 1 });
  return next;
}

export function removeFromCart(cart: CartItem[], id: number): CartItem[] {
  return cart.filter(x => x.id !== id);
}

export function changeQty(cart: CartItem[], id: number, delta: number): CartItem[] {
  const next = [...cart];
  const item = next.find(x => x.id === id);
  if (!item) return cart;
  item.qty += delta;
  if (item.qty <= 0) return removeFromCart(next, id);
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
