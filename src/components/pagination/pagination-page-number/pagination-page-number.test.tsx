import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PAGE_KEY } from '@/constants/searchParamsKeys';
import PaginationPageNumber from './pagination-page-number';
import userEvent from '@testing-library/user-event';
import { SearchParamsDisplay } from '@/__tests__/components';

describe('PaginationPageNumber', () => {
  function customRender({
    page = 2,
    currentPage = 1,
  }: { page?: number; currentPage?: number } = {}) {
    render(
      <MemoryRouter initialEntries={['/?page=1']}>
        <PaginationPageNumber
          page={page}
          currentPage={currentPage}
          queryKey={PAGE_KEY}
        />
        <SearchParamsDisplay />
      </MemoryRouter>
    );
  }

  it('should render without breaking', () => {
    customRender();

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should change page in query parameters on click', async () => {
    customRender();
    const user = userEvent.setup();

    await user.click(screen.getByText('2'));

    expect(screen.getByTestId('search-params')).toHaveTextContent('?page=2');
  });

  it('should not change page on click if it represents current page', async () => {
    customRender({ page: 3, currentPage: 3 });
    const user = userEvent.setup();
    const before = screen.getByTestId('search-params').textContent;

    await user.click(screen.getByText('3'));

    const after = screen.getByTestId('search-params').textContent;
    expect(after).toBe(before);
  });
});
