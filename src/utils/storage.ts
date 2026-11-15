/** Safe wrappers around localStorage — never throw (private mode, quota, SSR). */
const PREFIX = 'clf:';

export function readStorage<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(PREFIX + key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    /* storage unavailable — progress simply won't persist */
  }
}

/** Removes the given keys (already namespaced by the caller's scope). Accounts are never touched. */
export function removeStorage(keys: string[]): void {
  try {
    keys.forEach((k) => window.localStorage.removeItem(PREFIX + k));
  } catch {
    /* ignore */
  }
}
