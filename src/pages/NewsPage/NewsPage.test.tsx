import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsPage from './NewsPage';
import { mockNews } from '@/__tests__/mocks';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import type { Mock } from 'vitest';
import { MemoryRouter } from 'react-router';
import { SearchParamsDisplay } from '@/__tests__/components';
import { act } from 'react';

describe('NewsPage', () => {
  let mockFetch: Mock;

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    mockFetch = vi.spyOn(window, 'fetch');
  });

  async function customRender(options?: {
    reject?: boolean;
    savedTerm?: string;
  }) {
    const testText = 'testText';
    const errorText = 'Error text';

    if (options?.reject) {
      mockFetch.mockRejectedValue(new Error(errorText));
    } else {
      mockFetch.mockResolvedValue({
        ok: true,
        json: async () => mockNews,
      } as Response);
    }

    if (options?.savedTerm) {
      localStorage.setItem(REQUEST_KEY, JSON.stringify(options.savedTerm));
    }

    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/?page=1']}>
          <NewsPage />
        </MemoryRouter>
      );
    });

    const input = await screen.findByRole('textbox');
    const button = await screen.findByRole('button', { name: '' });
    const user = userEvent.setup();

    return {
      testText,
      input,
      button,
      user,
    };
  }

  it('should render without breaking', async () => {
    await customRender();

    expect(await screen.findByRole('textbox')).toBeInTheDocument();
    expect(await screen.findByText(/title 1/i)).toBeInTheDocument();
  });

  it('should display term from local storage if it exists', async () => {
    const savedText = 'savedText';
    const { input } = await customRender({ savedTerm: savedText });

    expect(input).toHaveValue(savedText);
  });

  it('should display empty input if term from local storage does not exist', async () => {
    const { input } = await customRender();

    expect(input).toHaveValue('');
  });

  it('should fetch data on load', async () => {
    const savedText = 'savedText';
    await customRender({ savedTerm: savedText });

    expect(mockFetch).toHaveBeenCalled();
  });

  it('should not throw on api error', async () => {
    await expect(customRender({ reject: true })).resolves.not.toThrow();
  });

  it('should save search term to localStorage when search button is clicked', async () => {
    const { user, input, button, testText } = await customRender();

    await user.type(input, testText);
    await user.click(button);

    expect(localStorage.getItem(REQUEST_KEY)).toBe(JSON.stringify(testText));
  });

  it('should trim whitespaces from search input before saving', async () => {
    const { user, input, button, testText } = await customRender();

    await user.type(input, '  ' + testText + ' ');
    await user.click(button);

    expect(localStorage.getItem(REQUEST_KEY)).toBe(JSON.stringify(testText));
  });

  it('should trigger fetch only once if search did not change', async () => {
    const { user, input, button, testText } = await customRender();

    await user.type(input, testText);
    await user.click(button);
    await user.click(button);

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should overwrite saved search if it changed', async () => {
    const { user, input, button, testText } = await customRender();

    await user.type(input, testText);
    await user.click(button);
    await user.type(input, testText);
    await user.click(button);

    expect(localStorage.getItem(REQUEST_KEY)).toBe(
      JSON.stringify(testText + testText)
    );
  });

  it('should set page to 1 if no page in search parameters', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/']}>
          <NewsPage />
          <SearchParamsDisplay />
        </MemoryRouter>
      );
    });

    const searchParams = screen.getByTestId('search-params').textContent;

    expect(searchParams).toBe('?page=1');
  });
});
