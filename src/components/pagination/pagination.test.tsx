import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PAGE_KEY } from '@/constants/searchParamsKeys';
import { API_PAGE_SIZE } from '@/constants/numbers';
import Pagination from './pagination';
import userEvent from '@testing-library/user-event';
import { SearchParamsDisplay } from '@/__tests__/components';

describe('Pagination', () => {
  function customRender({
    pageSize = API_PAGE_SIZE,
    totalItems = 100,
    startPage = 2,
  }: {
    pageSize?: number;
    totalItems?: number;
    startPage?: number;
    noStartPage?: boolean;
  } = {}) {
    render(
      <MemoryRouter initialEntries={[`/?page=${startPage}`]}>
        <Pagination
          totalItems={totalItems}
          pageSize={pageSize}
          queryKey={PAGE_KEY}
        />
        <SearchParamsDisplay />
      </MemoryRouter>
    );

    const buttons = screen.getAllByRole('button');
    const locationDisplay = screen.getByTestId('search-params');
    const user = userEvent.setup();

    return {
      buttons,
      locationDisplay,
      user,
    };
  }

  it('should render without breaking', () => {
    const { buttons } = customRender({ startPage: 2 });

    expect(buttons).toHaveLength(2);
    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('should switch page to the next on right button click', async () => {
    const { buttons, locationDisplay, user } = customRender({ startPage: 3 });
    const nextButton = buttons[1];

    await user.click(nextButton);

    const locationAfter = locationDisplay.textContent;
    expect(locationAfter).toBe('?page=4');
  });

  it('should switch page to the previous on left button click', async () => {
    const { buttons, locationDisplay, user } = customRender({ startPage: 3 });
    const backButton = buttons[0];

    await user.click(backButton);

    const locationAfter = locationDisplay.textContent;
    expect(locationAfter).toBe('?page=2');
  });

  it('should not switch page to the next on right button click if page is last', async () => {
    const { buttons, locationDisplay, user } = customRender({
      startPage: 3,
      totalItems: 15,
      pageSize: 5,
    });
    const nextButton = buttons[1];

    await user.click(nextButton);

    const locationAfter = locationDisplay.textContent;
    expect(locationAfter).toBe('?page=3');
  });

  it('should not switch page to the previous on left button click if page is first', async () => {
    const { buttons, locationDisplay, user } = customRender({ startPage: 1 });
    const backButton = buttons[0];

    await user.click(backButton);

    const locationAfter = locationDisplay.textContent;
    expect(locationAfter).toBe('?page=1');
  });

  it('should render nothing if page is not number', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/?page=test']}>
        <Pagination
          totalItems={100}
          pageSize={API_PAGE_SIZE}
          queryKey={PAGE_KEY}
        />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing if page is negative number', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/?page=-2']}>
        <Pagination
          totalItems={100}
          pageSize={API_PAGE_SIZE}
          queryKey={PAGE_KEY}
        />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render nothing if page is not in search params', async () => {
    const { container } = render(
      <MemoryRouter initialEntries={['/']}>
        <Pagination
          totalItems={100}
          pageSize={API_PAGE_SIZE}
          queryKey={PAGE_KEY}
        />
      </MemoryRouter>
    );

    expect(container).toBeEmptyDOMElement();
  });

  it('should render only 1 page if page size is 0', () => {
    customRender({ startPage: 1, pageSize: 0 });

    expect(screen.getByText('1')).toBeInTheDocument();
    expect(screen.queryByText('2')).not.toBeInTheDocument();
  });
});
