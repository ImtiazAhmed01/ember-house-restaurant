"use client";

import { useEffect, useState } from "react";

/** Persists state to localStorage, hydrating after mount to avoid SSR
 * mismatches (the server never sees the visitor's stored data). */
export function useLocalStorage<T>(key: string, initial: T) {
  const [value, setValue] = useState<T>(initial);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(key);
      if (raw) setValue(JSON.parse(raw));
    } catch {
      // ignore malformed storage
    }
    setHydrated(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    if (!hydrated) return;
    try {
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // storage full or unavailable — fail silently, app still works in-memory
    }
  }, [key, value, hydrated]);

  return [value, setValue, hydrated] as const;
}
