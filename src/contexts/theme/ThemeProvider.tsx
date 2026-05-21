import { useLayoutEffect } from 'react';
import type { AppTheme } from '@/types/theme';
import { THEME_KEY } from '@/constants/localStorageKeys';
import { useLocalStorage } from '@/utils/hooks';
import { ThemeContext } from './ThemeContext';

export default function ThemeProvider({
  children,
}: {
  children: React.ReactNode | null;
}) {
  const [theme, setTheme] = useLocalStorage<AppTheme>(THEME_KEY, 'light');

  useLayoutEffect(() => {
    if (theme === 'light') {
      document.documentElement.dataset.theme = 'light';
    } else {
      document.documentElement.dataset.theme = 'dark';
    }
  }, [theme]);

  function toggleTheme() {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  }

  return <ThemeContext value={{ theme, toggleTheme }}>{children}</ThemeContext>;
}
