import { render, screen } from '@testing-library/react';
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
      json: async () => ({
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
    const { user, pathName } = await customRender();

    const closeButton = await screen.findByRole('button');
    await user.click(closeButton);

    expect(pathName.textContent).toBe('/');
  });

  it('should show error message on api error', async () => {
    mockFetch.mockRejectedValue(new Error('Error'));
    await customRender();

    expect(screen.queryByText('Title')).not.toBeInTheDocument();
    expect(
      screen.getByText(TEXT.features.news.newsDetails.fetchError)
    ).toBeInTheDocument();
  });
});
