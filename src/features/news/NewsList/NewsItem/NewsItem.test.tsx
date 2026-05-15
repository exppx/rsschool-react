import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NewsItem from './NewsItem';
import { mockArticle, mockEmptyArticle } from '@/__tests__/mocks';
import { MemoryRouter } from 'react-router';
import { PathDisplay, SearchParamsDisplay } from '@/__tests__/components';

describe('NewsItem', () => {
  function customRender({ isMockEmpty }: { isMockEmpty?: boolean } = {}) {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <NewsItem article={isMockEmpty ? mockEmptyArticle : mockArticle} />
        <PathDisplay />
        <SearchParamsDisplay />
      </MemoryRouter>
    );
  }

  it('should render without breaking', () => {
    customRender();

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('should render title, description and link to the source', () => {
    customRender();

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'url');
  });

  it('should not render link if source is not provided', () => {
    customRender({ isMockEmpty: true });

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });

  it('should redirect to details page on click', async () => {
    customRender();
    const title = screen.getByText('Title');
    const user = userEvent.setup();

    await user.click(title);

    const pathAfter = screen.getByTestId('path').textContent;
    expect(pathAfter).toBe('/details/');
  });

  it('should preserve page search params on redirect', async () => {
    customRender();
    const title = screen.getByText('Title');
    const user = userEvent.setup();
    const searchParamsBefore = screen.getByTestId('search-params').textContent;

    await user.click(title);

    const searchParamsAfter = screen.getByTestId('search-params').textContent;
    expect(searchParamsAfter).toMatch(searchParamsBefore);
  });
});
