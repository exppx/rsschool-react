import { render, screen, waitFor } from '@testing-library/react';
import SearchNewsForm from './SearchNewsForm';
import * as api from '../api';
import type { NewsApiResponse } from '../types';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import userEvent from '@testing-library/user-event';

const mockApiResponse: NewsApiResponse = {
  status: 'ok',
  totalResults: 2,
  articles: [
    {
      source: { id: '1', name: 'Source 1' },
      author: 'Author 1',
      title: 'Title 1',
      description: 'Description 1',
      url: 'url 1',
      urlToImage: 'urlToImage 1',
      publishedAt: '2026-04-13T21:25:17Z',
      content: 'Content 1',
    },
    {
      source: { id: '2', name: 'Source 2' },
      author: 'Author 2',
      title: 'Title 2',
      description: 'Description 2',
      url: 'url 2',
      urlToImage: 'urlToImage 2',
      publishedAt: '2026-04-13T21:25:17Z',
      content: 'Content 2',
    },
  ],
};

describe('SearchNewsForm', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  function customRender(options?: { reject: boolean }) {
    const testText = 'testText';
    const errorText = 'Error text';

    const apiSpy = vi.spyOn(api, 'fetchNews');

    if (options?.reject) {
      apiSpy.mockRejectedValue(new Error(errorText));
    } else {
      apiSpy.mockResolvedValue(mockApiResponse);
    }

    const setErrorSpy = vi.fn();

    render(
      <SearchNewsForm
        onNewsReceived={vi.fn()}
        setIsLoading={vi.fn()}
        setError={setErrorSpy}
        isLoading={false}
      />
    );

    const input = screen.getByRole('textbox');
    const button = screen.getByRole('button');
    const user = userEvent.setup();

    return {
      testText,
      errorText,
      setErrorSpy,
      input,
      button,
      user,
    };
  }

  it('should render without breaking', () => {
    customRender();
  });

  it('should render input and button', () => {
    const { input, button } = customRender();

    expect(input).toBeInTheDocument();
    expect(button).toBeInTheDocument();
  });

  it('should display term from local storage if it exist in input', () => {
    const testText = 'testText';
    localStorage.setItem(REQUEST_KEY, testText);

    render(
      <SearchNewsForm
        onNewsReceived={vi.fn()}
        setIsLoading={vi.fn()}
        setError={vi.fn()}
        isLoading={false}
      />
    );

    expect(screen.getByRole('textbox')).toHaveValue(testText);
  });

  it('should display empty input if term from local storage does not exist', () => {
    const { input } = customRender();

    expect(input).toHaveValue('');
  });

  it('should update input value when user types', async () => {
    const { testText, input, user } = customRender();

    await user.type(input, testText);

    expect(input).toHaveValue(testText);

    await user.type(input, testText);

    expect(input).toHaveValue(testText + testText);
  });

  it('should save search term to localStorage when search button is clicked', async () => {
    const { user, input, button, testText } = customRender();

    await user.type(input, testText);
    await user.click(button);

    expect(localStorage.getItem(REQUEST_KEY)).toBe(testText);
  });

  it('should trim whitespaces from search input before saving', async () => {
    const { user, input, button, testText } = customRender();

    await user.type(input, '  ' + testText + ' ');
    await user.click(button);

    expect(localStorage.getItem(REQUEST_KEY)).toBe(testText);
  });

  it('should trigger fetch with correct search on button click', async () => {
    const { user, input, button, testText } = customRender();

    await user.type(input, '  ' + testText + ' ');
    await user.click(button);

    expect(api.fetchNews).toHaveBeenCalledWith(testText);
  });

  it('should trigger fetch only once if search did not change', async () => {
    const { user, input, button, testText } = customRender();

    await user.type(input, testText);
    await user.click(button);
    await user.click(button);

    expect(api.fetchNews).toHaveBeenCalledTimes(2);
  });

  it('should overwrite saved search if it changed', async () => {
    const { user, input, button, testText } = customRender();

    await user.type(input, testText);
    await user.click(button);
    await user.type(input, testText);
    await user.click(button);

    expect(localStorage.getItem(REQUEST_KEY)).toBe(testText + testText);
  });

  it('should call setError if api rejected', async () => {
    const { errorText, setErrorSpy } = customRender({ reject: true });

    await waitFor(() => {
      expect(setErrorSpy).toHaveBeenCalledWith(errorText);
    });
  });

  it('should fetch data on load', () => {
    customRender();

    expect(api.fetchNews).toHaveBeenCalledOnce();
  });

  it('should fetch data on load using saved term', () => {
    const testText = 'testText';
    localStorage.setItem(REQUEST_KEY, testText);

    render(
      <SearchNewsForm
        onNewsReceived={vi.fn()}
        setIsLoading={vi.fn()}
        setError={vi.fn()}
        isLoading={false}
      />
    );

    expect(api.fetchNews).toHaveBeenCalledWith(testText);
  });
});
