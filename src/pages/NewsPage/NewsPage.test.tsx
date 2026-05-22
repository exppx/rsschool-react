import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsPage from './NewsPage';
import { mockNews } from '@/__tests__/mocks';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import type { Mock } from 'vitest';
import { MemoryRouter } from 'react-router';
import { SearchParamsDisplay } from '@/__tests__/components';
import { act } from 'react';
import { createTestStore } from '@/__tests__/store';
import { Provider } from 'react-redux';

describe('NewsPage', () => {
  let mockFetch: Mock;

  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
    mockFetch = vi.spyOn(window, 'fetch');
  });

  async function customRender(options?: {
    savedTerm?: string;
    response?: { ok: boolean; status: number; json: () => Promise<unknown> };
  }) {
    const store = createTestStore();
    const testText = 'testText';

    mockFetch.mockResolvedValue(
      options?.response ??
        ({
          ok: true,
          status: 200,
          json: () => Promise.resolve(mockNews),
        } as Response)
    );

    if (options?.savedTerm) {
      localStorage.setItem(REQUEST_KEY, JSON.stringify(options.savedTerm));
    }

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/?page=1']}>
          <NewsPage />
        </MemoryRouter>
      </Provider>
    );

    const input = await screen.findByRole('textbox', {
      name: 'search input',
    });
    const button = await screen.findByRole('button', { name: 'search button' });
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

  it('should render articles on api response status non 4xx/5xx', async () => {
    await customRender({
      response: {
        ok: false,
        status: 300,
        json: () => Promise.resolve(mockNews),
      },
    });

    await waitFor(() => {
      expect(screen.queryByText('Title 1')).toBeInTheDocument();
    });
  });

  it('should not render articles on api status 4xx', async () => {
    await customRender({
      response: { ok: false, status: 404, json: () => Promise.resolve('') },
    });

    await waitFor(() => {
      expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
    });
  });

  it('should not render articles on api status 5xx', async () => {
    await customRender({
      response: { ok: false, status: 500, json: () => Promise.resolve('') },
    });

    await waitFor(() => {
      expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
    });
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
    const store = createTestStore();
    await act(async () => {
      render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/']}>
            <NewsPage />
            <SearchParamsDisplay />
          </MemoryRouter>
        </Provider>
      );
    });

    const searchParams = screen.getByTestId('search-params').textContent;

    expect(searchParams).toBe('?page=1');
  });
});
