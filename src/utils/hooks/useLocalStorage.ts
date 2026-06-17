'use client';

import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(initialValue);

  useEffect(() => {
    try {
      const rawSavedValue = localStorage.getItem(key);

      if (rawSavedValue) {
        // eslint-disable-next-line
        setValue(JSON.parse(rawSavedValue));
      }
    } catch (e) {
      console.error('localStorage read error', e);
    }
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (e) {
      console.error('localStorage write error', e);
    }
  }, [key, value]);

  return [value, setValue] as const;
}
