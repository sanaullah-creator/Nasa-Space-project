import { useCallback, useState } from 'react';
import { readStorage, writeStorage } from '../utils/storage';

/** useState that persists to localStorage under a namespaced key.
 *  If the key changes (e.g. a different user logs in) the stored value for the new key is loaded. */
export function useLocalStorage<T>(key: string, initial: T) {
  const [state, setState] = useState<{ key: string; value: T }>(() => ({ key, value: readStorage<T>(key, initial) }));

  // Re-read synchronously during render when the key changes (React-recommended "derive from props" pattern).
  let current = state;
  if (state.key !== key) {
    current = { key, value: readStorage<T>(key, initial) };
    setState(current);
  }

  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      setState((prev) => {
        const base = prev.key === key ? prev.value : readStorage<T>(key, initial);
        const resolved = typeof next === 'function' ? (next as (p: T) => T)(base) : next;
        writeStorage(key, resolved);
        return { key, value: resolved };
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );

  return [current.value, set] as const;
}
