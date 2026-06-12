/**
 * PIN hashing. Deliberately uses a synchronous non-cryptographic hash (cyrb53)
 * instead of WebCrypto: crypto.subtle is unavailable in insecure contexts
 * (e.g. trying the dev server from a phone over LAN), and a 4–6 digit PIN is
 * brute-forceable under any hash anyway. This keeps the PIN out of plain sight
 * in localStorage — it is a child gate, not a security boundary.
 */

function cyrb53(str: string, seed = 0): number {
  let h1 = 0xdeadbeef ^ seed;
  let h2 = 0x41c6ce57 ^ seed;
  for (let i = 0; i < str.length; i++) {
    const ch = str.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507);
  h1 ^= Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507);
  h2 ^= Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return 4294967296 * (2097151 & h2) + (h1 >>> 0);
}

export function hashString(input: string): string {
  const a = cyrb53(input, 1);
  const b = cyrb53(input, 2);
  return a.toString(16).padStart(14, '0') + b.toString(16).padStart(14, '0');
}

export function randomSalt(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(8));
  return Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
}

export function hashPin(pin: string, salt: string): string {
  return hashString(`${salt}:${pin}`);
}

export function generateRecoveryCode(): string {
  const digits = crypto.getRandomValues(new Uint8Array(6));
  return Array.from(digits, (b) => String(b % 10)).join('');
}

export function hashRecoveryCode(code: string): string {
  // Independent of the PIN salt so changing the PIN never invalidates the code.
  return hashString(`recovery:${code}`);
}
