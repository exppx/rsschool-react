import { useEffect, useState } from 'react';

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    const rawSavedValue = localStorage.getItem(key);
    const savedValue = rawSavedValue ? JSON.parse(rawSavedValue) : initialValue;

    return savedValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue] as const;
}
