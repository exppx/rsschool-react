import { render, screen } from '@testing-library/react';
import ThemeProvider from './ThemeProvider';
import { THEME_KEY } from '@/constants/localStorageKeys';
import { TestThemeToggler } from '@/__tests__/components';
import userEvent from '@testing-library/user-event';

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render without breaking', () => {
    render(<ThemeProvider>{null}</ThemeProvider>);
  });

  it('should set theme to light by default', () => {
    render(<ThemeProvider>{null}</ThemeProvider>);

    expect(document.documentElement.dataset.theme).toBe('light');
  });

  it('should theme to dark if such theme saved in localStorage', () => {
    localStorage.setItem(THEME_KEY, JSON.stringify('dark'));

    render(<ThemeProvider>{null}</ThemeProvider>);

    expect(document.documentElement.dataset.theme).toBe('dark');
  });

  it('should toggle theme when toggleTheme function is called', async () => {
    render(
      <ThemeProvider>
        <TestThemeToggler />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    const themeBefore = document.documentElement.dataset.theme;
    const button = screen.getByTestId('theme-toggle');
    await user.click(button);
    const themeAfter = document.documentElement.dataset.theme;
    await user.click(button);
    const themeAfterAfter = document.documentElement.dataset.theme;

    expect(themeBefore).toBe('light');
    expect(themeAfter).toBe('dark');
    expect(themeAfterAfter).toBe('light');
  });
});
