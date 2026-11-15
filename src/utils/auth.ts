/* Client-side account helpers.
 * IMPORTANT: this project has no backend, so accounts live in the visitor's own browser
 * (localStorage). Passwords are salted and hashed with SHA-256 before saving, but this is a
 * DEMO login system — not a substitute for real server-side authentication. */

export const AVATAR_COLORS = ['#f2603a', '#5ab0ff', '#34d399', '#a78bfa', '#fbbf24', '#f472b6'];

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export function randomId(bytes = 16): string {
  const arr = new Uint8Array(bytes);
  if (globalThis.crypto?.getRandomValues) globalThis.crypto.getRandomValues(arr);
  else for (let i = 0; i < bytes; i++) arr[i] = Math.floor(Math.random() * 256);
  return Array.from(arr, (b) => b.toString(16).padStart(2, '0')).join('');
}

/** Small non-cryptographic fallback for browsers without SubtleCrypto (e.g. plain-HTTP LAN previews). */
function fallbackHash(input: string): string {
  let h1 = 0xdeadbeef;
  let h2 = 0x41c6ce57;
  for (let i = 0; i < input.length; i++) {
    const ch = input.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return `fb-${(h2 >>> 0).toString(16)}${(h1 >>> 0).toString(16)}`;
}

export async function hashPassword(password: string, salt: string): Promise<string> {
  const subtle = globalThis.crypto?.subtle;
  if (!subtle) return fallbackHash(salt + password);
  const data = new TextEncoder().encode(`${salt}:${password}`);
  const digest = await subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, '0')).join('');
}

export interface PasswordStrength {
  score: 0 | 1 | 2 | 3 | 4;
  label: string;
  color: string;
}

export function passwordStrength(pw: string): PasswordStrength {
  let score = 0;
  if (pw.length >= 8) score++;
  if (pw.length >= 12) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw) && /[^A-Za-z0-9]/.test(pw)) score++;
  const s = Math.min(score, 4) as PasswordStrength['score'];
  const meta = [
    { label: 'Too weak', color: '#f43f5e' },
    { label: 'Weak', color: '#fb923c' },
    { label: 'Okay', color: '#fbbf24' },
    { label: 'Strong', color: '#34d399' },
    { label: 'Very strong', color: '#22d3ee' },
  ][s];
  return { score: s, ...meta };
}

/** Returns an error message, or null if the password is acceptable. */
export function validatePassword(pw: string): string | null {
  if (pw.length < 8) return 'Password must be at least 8 characters.';
  if (!/[A-Za-z]/.test(pw) || !/\d/.test(pw)) return 'Password must contain at least one letter and one number.';
  return null;
}

export function validateName(name: string): string | null {
  const n = name.trim();
  if (n.length < 2) return 'Please enter at least 2 characters.';
  if (n.length > 40) return 'Name must be 40 characters or fewer.';
  return null;
}

export function initials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (!parts.length) return '?';
  return (parts[0][0] + (parts.length > 1 ? parts[parts.length - 1][0] : '')).toUpperCase();
}

/** Only allow redirects to internal app paths (prevents open-redirects). */
export function safeRedirect(target: string | null): string {
  if (!target || !target.startsWith('/') || target.startsWith('//')) return '/';
  return target;
}
