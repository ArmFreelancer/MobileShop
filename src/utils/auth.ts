import { load, store } from './storage';
import type { User, Session } from '../types';

const USERS_KEY = 'pm_users';
const SESSION_KEY = 'pm_session';

export function getUsers(): User[] { return load<User[]>(USERS_KEY, []); }
function saveUsers(u: User[]) { store(USERS_KEY, u); }

export function register(name: string, email: string, pass: string): { ok: boolean; error?: string } {
  const users = getUsers();
  if (users.find(u => u.email === email)) return { ok: false, error: 'Email already registered' };
  users.push({ id: Date.now(), name, email, password: pass, orders: [], createdAt: new Date().toISOString() });
  saveUsers(users);
  store<Session>(SESSION_KEY, { email, name });
  return { ok: true };
}

export function login(email: string, pass: string): { ok: boolean; error?: string } {
  const users = getUsers();
  const user = users.find(u => u.email === email && u.password === pass);
  if (!user) return { ok: false, error: 'Invalid email or password' };
  store<Session>(SESSION_KEY, { email, name: user.name });
  return { ok: true };
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}

export function currentUser(): User | null {
  const s = load<Session | null>(SESSION_KEY, null);
  if (!s) return null;
  return getUsers().find(u => u.email === s.email) || null;
}

export function addOrderToUser(email: string, order: { id: number; items: unknown[]; total: number; date: string; status: string }) {
  const users = getUsers();
  const idx = users.findIndex(u => u.email === email);
  if (idx === -1) return;
  if (!users[idx].orders) users[idx].orders = [];
  users[idx].orders.push(order as any);
  saveUsers(users);
}
