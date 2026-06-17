import { Provider } from 'react-redux';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Mock } from 'vitest';
import type { Article } from '@/app/(news)/_types';
import { TEXT } from '@/constants/text';
import { createTestStore } from '@/__tests__/store';
import { mockArticle } from '@/__tests__/mocks';
import { toggleSelectNews } from '@/app/(news)/_store';
import NewsFlyout from './news-flyout';

vi.mock('@/utils/csv/downloadCsv');
import { downloadCsv } from '@/utils/csv/downloadCsv';

let mockQueryState: {
  data: Article[];
  isLoading: boolean;
  isError: boolean;
} = {
  data: [mockArticle],
  isLoading: false,
  isError: false,
};

const mockGetNews = vi.fn();

vi.mock('@news/api/newsApi', async (importOriginal) => {
  const actual =
    await importOriginal<typeof import('@/app/(news)/_api/newsApi')>();

  return {
    ...actual,
    useLazyGetNewsByDetailsListQuery: () => [
      mockGetNews,
      {
        get data() {
          return mockQueryState.data;
        },
        get isLoading() {
          return mockQueryState.isLoading;
        },
        get isError() {
          return mockQueryState.isError;
        },
      },
    ],
  };
});

describe('NewsFlyout.text', () => {
  const mockDownloadCsv = downloadCsv as Mock;

  beforeEach(() => {
    vi.clearAllMocks();
  });

  function customRender(options?: {
    data?: Article[];
    isLoading?: boolean;
    isError?: boolean;
  }) {
    mockQueryState = {
      data: options?.data ?? [mockArticle],
      isLoading: options?.isLoading ?? false,
      isError: options?.isError ?? false,
    };

    mockGetNews.mockResolvedValue({
      data: mockQueryState.data,
    });

    const store = createTestStore();
    const user = userEvent.setup();

    return {
      store,
      user,
      ...render(
        <Provider store={store}>
          <NewsFlyout />
        </Provider>
      ),
    };
  }

  it('should render without breaking', () => {
    customRender();
  });

  it('should not render if no news selected', () => {
    const { container } = customRender();

    expect(container).toBeEmptyDOMElement();
  });

  it('should show number of selected news', () => {
    const { store } = customRender();

    act(() => {
      store.dispatch(toggleSelectNews('testId1'));
      store.dispatch(toggleSelectNews('testId2'));
    });

    screen.getAllByText(/2/).forEach((element) => {
      expect(element).toBeInTheDocument();
    });
  });

  it('should show error message on download fail', async () => {
    const { store } = customRender({ isError: true });
    act(() => {
      store.dispatch(toggleSelectNews('testId'));
    });

    expect(
      screen.getByText(TEXT.features.news.newsFlyout.error)
    ).toBeInTheDocument();
  });

  it('should show loading message on downloading', async () => {
    const { store } = customRender({ isLoading: true });
    act(() => {
      store.dispatch(toggleSelectNews('testId'));
    });

    expect(
      screen.getByText(TEXT.features.news.newsFlyout.downloading)
    ).toBeInTheDocument();
  });

  it('should trigger download on download button click', async () => {
    const { store, user } = customRender();
    act(() => {
      store.dispatch(toggleSelectNews('testId'));
    });

    const downloadButton = screen.getByRole('button', { name: /download/i });
    await user.click(downloadButton);

    expect(mockDownloadCsv).toHaveBeenCalledOnce();
  });

  it('should unselect all news if Unselect all button is clicked', async () => {
    const { store, user } = customRender();
    act(() => {
      store.dispatch(toggleSelectNews('testId1'));
      store.dispatch(toggleSelectNews('testId2'));
    });

    const unselectButton = screen.getByRole('button', {
      name: TEXT.features.news.newsFlyout.unselect,
    });
    await user.click(unselectButton);

    expect(store.getState().news.selectedIds).toHaveLength(0);
  });
});
