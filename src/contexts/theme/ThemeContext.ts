import { createContext, useContext } from 'react';
import type { AppTheme } from '@/types/theme';

type ThemeContextValue = {
  theme: AppTheme;
  toggleTheme: () => void;
};

const initialValue: ThemeContextValue = {
  theme: 'light',
  toggleTheme: () => {},
};

export const ThemeContext = createContext<ThemeContextValue>(initialValue);

export function useTheme() {
  return useContext(ThemeContext);
}
