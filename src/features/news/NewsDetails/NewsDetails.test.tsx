import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import type { Mock } from 'vitest';
import { DETAILS_KEY } from '@/constants/searchParamsKeys';
import { TEXT } from '@/constants/text';
import NewsDetails from './NewsDetails';
import { mockArticle } from '@/__tests__/mocks';
import userEvent from '@testing-library/user-event';
import { PathDisplay, SearchParamsDisplay } from '@/__tests__/components';
import { act } from 'react';

describe('NewsDetails', () => {
  let mockFetch: Mock;

  beforeEach(() => {
    vi.restoreAllMocks();
    mockFetch = vi.spyOn(window, 'fetch');
  });

  async function customRender() {
    await act(async () => {
      render(
        <MemoryRouter
          initialEntries={[`/details/?page=1&${DETAILS_KEY}=SomeText`]}
        >
          <NewsDetails />
          <SearchParamsDisplay />
          <PathDisplay />
        </MemoryRouter>
      );
    });

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
    await customRender();
  });

  it('should render news details', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          status: 'ok',
          articles: [mockArticle],
          totalResults: 1,
        }),
    } as Response);
    await customRender();

    const title = screen.getByText('Title');

    expect(title).toBeInTheDocument();
  });

  it('should redirect to / on close button click', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          status: 'ok',
          articles: [mockArticle],
          totalResults: 1,
        }),
    } as Response);
    const { user, pathName } = await customRender();

    const closeButton = await screen.findByRole('button');
    await user.click(closeButton);

    expect(pathName.textContent).toBe('/');
  });

  it('should inform if article not found', async () => {
    mockFetch.mockResolvedValue({
      ok: true,
      status: 200,
      json: () =>
        Promise.resolve({
          status: 'ok',
          articles: [],
          totalResults: 0,
        }),
    } as Response);

    await customRender();

    await waitFor(() => {
      expect(
        screen.queryByText(TEXT.features.news.newsDetails.notFound)
      ).toBeInTheDocument();
    });
  });

  it('should render articles on api response status non 4xx/5xx', async () => {
    mockFetch.mockResolvedValue({
      ok: false,
      status: 300,
      json: () =>
        Promise.resolve({
          status: 'ok',
          articles: [mockArticle],
          totalResults: 1,
        }),
    } as Response);

    await customRender();

    await waitFor(() => {
      expect(screen.queryByText('Title')).toBeInTheDocument();
    });
  });

  it('should show error message on api status 4xx', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 404 });
    await customRender();

    await waitFor(() => {
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });
    expect(
      screen.getByText(TEXT.features.news.newsDetails.fetchError)
    ).toBeInTheDocument();
  });

  it('should show error message on api status 5xx', async () => {
    mockFetch.mockResolvedValue({ ok: false, status: 500 });
    await customRender();

    await waitFor(() => {
      expect(screen.queryByText('Title')).not.toBeInTheDocument();
    });
    expect(
      screen.getByText(TEXT.features.news.newsDetails.fetchError)
    ).toBeInTheDocument();
  });
});
