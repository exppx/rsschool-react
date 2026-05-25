import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { Article } from '@news/types';
import { DETAILS_KEY } from '@/constants/searchParamsKeys';
import { TEXT } from '@/constants/text';
import { mockArticle } from '@/__tests__/mocks';
import { PathDisplay, SearchParamsDisplay } from '@/__tests__/components';
import NewsDetails from './NewsDetails';
import { createTestStore } from '@/__tests__/store';
import { Provider } from 'react-redux';

let mockQueryState: {
  data: Article | undefined;
  isFetching: boolean;
  isError: boolean;
} = {
  data: mockArticle,
  isFetching: false,
  isError: false,
};

vi.mock('@news/api/newsApi', async (importOriginal) => {
  const actual = await importOriginal<typeof import('@news/api/newsApi')>();

  return {
    ...actual,
    useGetNewsByDetailsQuery: () => ({
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

describe('NewsDetails', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  async function customRender(options?: {
    data?: Article;
    isFetching?: boolean;
    isError?: boolean;
  }) {
    mockQueryState = {
      data: options?.data,
      isFetching: options?.isFetching ?? false,
      isError: options?.isError ?? false,
    };

    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter
          initialEntries={[`/details/?page=1&${DETAILS_KEY}=SomeText`]}
        >
          <NewsDetails />
          <SearchParamsDisplay />
          <PathDisplay />
        </MemoryRouter>
      </Provider>
    );

    const user = userEvent.setup();
    const searchParams = screen.getByTestId('search-params');
    const pathName = screen.getByTestId('path');

    return {
      user,
      searchParams,
      pathName,
    };
  }

  it('should render without breaking', async () => {
    await customRender({ data: mockArticle });
  });

  it('should render news details', async () => {
    await customRender({ data: mockArticle });

    const title = screen.getByText('Title');

    expect(title).toBeInTheDocument();
  });

  it('should redirect to / on close button click', async () => {
    const { user, pathName } = await customRender({ data: mockArticle });

    const closeButton = await screen.findByRole('button');
    await user.click(closeButton);

    expect(pathName.textContent).toBe('/');
  });

  it('should inform if article not found', async () => {
    await customRender({ data: undefined });

    expect(
      screen.getByText(TEXT.features.news.newsDetails.notFound)
    ).toBeInTheDocument();
  });

  it('should inform if data is loading', async () => {
    await customRender({ isFetching: true });

    expect(screen.queryByText(/title/i)).not.toBeInTheDocument();
  });

  it('should inform if there was an error during data loading', async () => {
    await customRender({ isError: true });

    expect(
      screen.getByText(TEXT.features.news.newsDetails.fetchError)
    ).toBeInTheDocument();
  });
});
