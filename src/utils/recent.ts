import { load, store } from './storage';
import { PHONES } from '../data';
import type { Phone } from '../types';

const KEY = 'pm_recent';
const MAX = 6;

export function addRecent(id: number) {
  const ids = load<number[]>(KEY, []);
  const next = [id, ...ids.filter(x => x !== id)].slice(0, MAX);
  store(KEY, next);
}

export function loadRecent(): Phone[] {
  const ids = load<number[]>(KEY, []);
  return ids.map(id => PHONES.find(p => p.id === id)).filter(Boolean) as Phone[];
}
