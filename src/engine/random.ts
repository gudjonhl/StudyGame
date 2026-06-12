/** Random helpers for exercise generation. */

export function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function pick<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function shuffle<T>(arr: readonly T[]): T[] {
  const out = arr.slice();
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

export function sample<T>(arr: readonly T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

/** Generate n distinct distractor strings, none equal to `correct`. */
export function distinctDistractors(correct: string, gen: () => string, n = 3): string[] {
  const out = new Set<string>();
  let guard = 0;
  while (out.size < n && guard++ < 300) {
    const v = gen();
    if (v !== correct) out.add(v);
  }
  return [...out];
}
