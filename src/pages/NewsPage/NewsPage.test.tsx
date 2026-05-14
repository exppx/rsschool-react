import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsPage from './NewsPage';
import { fetchNews } from '@news/api';
import { mockNews } from '@/__tests__/mocks';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import type { Mock } from 'vitest';
import { MemoryRouter } from 'react-router';

vi.mock('@news/api', () => ({
  fetchNews: vi.fn(),
}));

describe('NewsPage', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  async function customRender(options?: {
    reject?: boolean;
    savedTerm?: string;
  }) {
    const testText = 'testText';
    const errorText = 'Error text';

    const apiSpy = fetchNews as Mock;

    if (options?.reject) {
      apiSpy.mockRejectedValue(new Error(errorText));
    } else {
      apiSpy.mockResolvedValue(mockNews);
    }

    if (options?.savedTerm) {
      localStorage.setItem(REQUEST_KEY, JSON.stringify(options.savedTerm));
    }

    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <NewsPage />
      </MemoryRouter>
    );

    const input = await screen.findByRole('textbox');
    const button = await screen.findByRole('button', { name: '' });
    const user = userEvent.setup();

    return {
      testText,
      input,
      button,
      apiSpy,
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

  it('should fetch data on load using saved term', async () => {
    const savedText = 'savedText';
    const { apiSpy } = await customRender({ savedTerm: savedText });

    expect(apiSpy).toHaveBeenCalledExactlyOnceWith(savedText, { page: '1' });
  });

  it('should not throw on api error', async () => {
    await customRender({ reject: true });
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

  it('should trigger fetch with correct search on button click', async () => {
    const { user, input, button, testText, apiSpy } = await customRender();

    await user.type(input, '  ' + testText + ' ');
    await user.click(button);

    expect(apiSpy).toHaveBeenCalledWith(testText, { page: '1' });
  });

  it('should trigger fetch only once if search did not change', async () => {
    const { user, input, button, testText, apiSpy } = await customRender();

    await user.type(input, testText);
    await user.click(button);
    await user.click(button);

    expect(apiSpy).toHaveBeenCalledTimes(2);
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
});
