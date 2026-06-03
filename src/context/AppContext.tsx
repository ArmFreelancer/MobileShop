import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { CartItem, User } from '../types';
import type { Currency, Lang } from '../data';
import { fmtPrice } from '../data';
import { load } from '../utils/storage';
import { currentUser, logout as authLogout, addOrderToUser } from '../utils/auth';
import {
  loadCart, saveCart, addToCart as addToCartFn, removeFromCart as removeFn,
  changeQty as changeQtyFn, clearCart as clearFn, cartTotal, cartCount,
} from '../utils/cart';

interface ToastMsg { text: string; type: 'success' | 'error'; id: number }

interface AppCtx {
  user: User | null;
  setUser: (u: User | null) => void;
  cart: CartItem[];
  setCart: (c: CartItem[]) => void;
  currency: Currency;
  setCurrency: (c: Currency) => void;
  lang: Lang;
  setLang: (l: Lang) => void;
  fmtPrice: (kzt: number) => string;
  addToCart: (p: { id: number; name: string; price: number; img: string; brand: string }) => void;
  removeFromCart: (id: number) => void;
  changeQty: (id: number, d: number) => void;
  clearCart: () => void;
  cartTotal: () => number;
  cartCount: () => number;
  toast: (text: string, type: 'success' | 'error') => void;
  toasts: ToastMsg[];
  checkout: () => void;
  loginUser: () => boolean;
  refreshUser: () => void;
  doLogout: () => void;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const Ctx = createContext<AppCtx>(null!);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [currency, setCurrency] = useState<Currency>(() => (load<Currency>('pm_currency', 'USD')));
  const [lang, setLang] = useState<Lang>(() => (load<Lang>('pm_lang', 'ru')));
  const [toasts, setToasts] = useState<ToastMsg[]>([]);
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('pm_dark_mode');
    if (saved !== null) return saved === 'true';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  const refreshUser = useCallback(() => setUser(currentUser()), []);

  useEffect(() => { setUser(currentUser()); setCart(loadCart()); }, []);

  useEffect(() => { saveCart(cart); }, [cart]);
  useEffect(() => { localStorage.setItem('pm_currency', currency); }, [currency]);
  useEffect(() => { localStorage.setItem('pm_lang', lang); }, [lang]);

  useEffect(() => {
    localStorage.setItem('pm_dark_mode', String(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = useCallback(() => {
    setDarkMode(prev => !prev);
  }, []);

  const addToast = useCallback((text: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { text, type, id }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 2500);
  }, []);

  const addToCartHandler = useCallback((p: { id: number; name: string; price: number; img: string; brand: string }) => {
    setCart(prev => addToCartFn(prev, p as any));
    addToast(`${p.name} +`, 'success');
  }, [addToast]);

  const removeFromCartHandler = useCallback((id: number) => setCart(prev => removeFn(prev, id)), []);
  const changeQtyHandler = useCallback((id: number, d: number) => setCart(prev => changeQtyFn(prev, id, d)), []);
  const clearCartHandler = useCallback(() => setCart(clearFn()), []);

  const fmtPriceCb = useCallback((kzt: number) => fmtPrice(kzt, currency), [currency]);

  const checkoutHandler = useCallback(() => {
    if (!cart.length) { addToast('cartEmpty', 'error'); return; }

    // Format Telegram order message
    let msg = lang === 'ru' 
      ? `Здравствуйте! Я хочу сделать заказ в PhoneMarket:\n\n`
      : `Hello! I would like to place an order at PhoneMarket:\n\n`;

    cart.forEach(i => {
      msg += `• ${i.name} (${i.storage}) x ${i.qty} — ${fmtPriceCb(i.price * i.qty)}\n`;
    });
    msg += `\n----------------------\n`;
    msg += lang === 'ru' 
      ? `Итого: ${fmtPriceCb(cartTotal(cart))}\n`
      : `Total: ${fmtPriceCb(cartTotal(cart))}\n`;

    if (user) {
      msg += lang === 'ru'
        ? `Покупатель: ${user.name} (${user.email})`
        : `Customer: ${user.name} (${user.email})`;
    }

    // Copy details to clipboard automatically
    navigator.clipboard.writeText(msg).then(() => {
      addToast(lang === 'ru' 
        ? 'Детали заказа скопированы! Переходим в Telegram...' 
        : 'Order details copied! Opening Telegram...', 'success');
    }).catch(() => {
      addToast(lang === 'ru' ? 'Открываем Telegram...' : 'Opening Telegram...', 'success');
    });

    // Save order details to user history if logged in
    if (user) {
      addOrderToUser(user.email, {
        id: Date.now(),
        items: JSON.parse(JSON.stringify(cart)),
        total: cartTotal(cart),
        date: new Date().toLocaleString(),
        status: 'Telegram Checkout',
      });
    }

    // Redirect to Telegram and clear cart after delay
    setTimeout(() => {
      window.open('https://t.me/armen_levonyan01', '_blank');
      setCart(clearFn());
    }, 1500);

  }, [user, cart, addToast, lang, fmtPriceCb]);

  const loginUser = useCallback(() => {
    refreshUser();
    return !!currentUser();
  }, [refreshUser]);

  const doLogout = useCallback(() => { authLogout(); setUser(null); }, []);

  return (
    <Ctx.Provider value={{
      user, setUser, cart, setCart, currency, setCurrency, lang, setLang,
      fmtPrice: fmtPriceCb, addToCart: addToCartHandler, removeFromCart: removeFromCartHandler,
      changeQty: changeQtyHandler, clearCart: clearCartHandler,
      cartTotal: () => cartTotal(cart), cartCount: () => cartCount(cart),
      toast: addToast, toasts, checkout: checkoutHandler, loginUser, refreshUser, doLogout,
      darkMode, toggleDarkMode,
    }}>
      {children}
    </Ctx.Provider>
  );
}

export function useApp() { return useContext(Ctx); }
