import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsPage from './NewsPage';
import { mockNews } from '@/__tests__/mocks';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import { MemoryRouter } from 'react-router';
import { SearchParamsDisplay } from '@/__tests__/components';
import { act } from 'react';
import { createTestStore } from '@/__tests__/store';
import { Provider } from 'react-redux';
import type { NewsApiResponse } from '@news/types';

let mockQueryState: {
  data: NewsApiResponse;
  isFetching: boolean;
  isError: boolean;
} = {
  data: mockNews,
  isFetching: false,
  isError: false,
};

vi.mock('@news/api/newsApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@news/api/newsApi')>();

  return {
    ...actual,
    useGetNewsQuery: () => ({
      get data() {
        return mockQueryState.data;
      },
      get isFetching() {
        return mockQueryState.isFetching;
      },
      get isError() {
        return mockQueryState.isError;
      },
    }),
  };
});

describe('NewsPage', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  async function customRender(options?: {
    savedTerm?: string;
    response?: {
      data?: NewsApiResponse;
      isFetching?: boolean;
      isError?: boolean;
    };
  }) {
    mockQueryState = {
      data: options?.response?.data ?? mockNews,
      isFetching: options?.response?.isFetching ?? false,
      isError: options?.response?.isError ?? false,
    };

    const store = createTestStore();
    const testText = 'testText';

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

  it('should not render articles on api error', async () => {
    await customRender({ response: { isError: true } });

    await waitFor(() => {
      expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
    });
  });

  it('should show skeleton while fetching data', async () => {
    await customRender({ response: { isFetching: true } });

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

  it('should not perform new search if term did not change', async () => {
    const { user, input, button, testText } = await customRender();

    await user.type(input, testText);
    await user.click(button);
    expect(screen.getByText(/title 1/i)).toBeInTheDocument();

    await user.click(button);
    expect(screen.getByText(/title 1/i)).toBeInTheDocument();
  });

  it('should trim whitespaces from search input before saving', async () => {
    const { user, input, button, testText } = await customRender();

    await user.type(input, '  ' + testText + ' ');
    await user.click(button);

    expect(localStorage.getItem(REQUEST_KEY)).toBe(JSON.stringify(testText));
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
