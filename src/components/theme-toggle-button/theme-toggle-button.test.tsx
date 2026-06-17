import { render, screen } from '@testing-library/react';
import ThemeToggleButton from './theme-toggle-button';
import { ThemeProvider } from '@/contexts/theme';
import userEvent from '@testing-library/user-event';

import sun from '@/assets/sun.svg';
import moon from '@/assets/moon.svg';

describe('ThemeToggleButton', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it('should render without breaking', () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    );
  });

  it('should toggle theme on click', async () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    const themeBefore = document.documentElement.dataset.theme;
    const button = screen.getByRole('button');
    await user.click(button);
    const themeAfter = document.documentElement.dataset.theme;

    expect(themeAfter).not.toEqual(themeBefore);
  });

  it('should render moon icon if theme is light', () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    );

    const theme = document.documentElement.dataset.theme;
    const image = screen.getByRole('img', { name: /theme/i });

    expect(theme).toEqual('light');
    expect(image).toHaveAttribute('src', moon);
  });

  it('should render sun icon if theme is dark', async () => {
    render(
      <ThemeProvider>
        <ThemeToggleButton />
      </ThemeProvider>
    );
    const user = userEvent.setup();

    const button = screen.getByRole('button');
    await user.click(button);
    const theme = document.documentElement.dataset.theme;
    const image = screen.getByRole('img', { name: /theme/i });

    expect(theme).toEqual('dark');
    expect(image).toHaveAttribute('src', sun);
  });
});
