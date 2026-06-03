export function store<T>(k: string, v: T): void {
  try { localStorage.setItem(k, JSON.stringify(v)); } catch {}
}

export function load<T>(k: string, d: T): T {
  try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch { return d; }
}
