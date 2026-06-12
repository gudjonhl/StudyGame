/** Small shared helpers used across the app. */

export function uid(): string {
  // crypto.randomUUID is unavailable in insecure contexts (e.g. testing over LAN),
  // so fall back to getRandomValues which works everywhere.
  if (typeof crypto.randomUUID === 'function') return crypto.randomUUID();
  const bytes = crypto.getRandomValues(new Uint8Array(16));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

const nf = new Intl.NumberFormat('is-IS');

/** Format an integer with Icelandic thousands separators (1.234). */
export function formatNum(n: number): string {
  return nf.format(n);
}

/** Local date as 'YYYY-MM-DD' (local timezone, not UTC). */
export function todayLocal(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

/** Add days to a 'YYYY-MM-DD' string, returning the same format. */
export function addDays(day: string, delta: number): string {
  const [y, m, d] = day.split('-').map(Number);
  const date = new Date(y, m - 1, d + delta);
  return todayLocal(date);
}

/** Short Icelandic date for activity lists, e.g. '12. jún.'. */
export function shortDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString('is-IS', { day: 'numeric', month: 'short' });
}
