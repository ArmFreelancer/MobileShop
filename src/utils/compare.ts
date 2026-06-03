import { load, store } from './storage';
import { PHONES } from '../data';
import type { Phone } from '../types';

const KEY = 'pm_compare';
const MAX = 3;

export function loadCompare(): Phone[] {
  const ids = load<number[]>(KEY, []);
  return ids.map(id => PHONES.find(p => p.id === id)).filter(Boolean) as Phone[];
}

export function toggleCompare(id: number): Phone[] {
  let ids = load<number[]>(KEY, []);
  if (ids.includes(id)) ids = ids.filter(x => x !== id);
  else if (ids.length < MAX) ids.push(id);
  store(KEY, ids);
  return ids.map(id => PHONES.find(p => p.id === id)).filter(Boolean) as Phone[];
}

export function clearCompare() {
  store(KEY, []);
}
