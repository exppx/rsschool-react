import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { TEXT } from '@/constants/text';
import NotFoundPage from './NotFoundPage';

describe('NotFoundPage', () => {
  it('should render without breaking', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    expect(screen.getByText(TEXT.pages.notFound.notFound)).toBeInTheDocument();
  });

  it('should have link to main page', () => {
    render(
      <MemoryRouter>
        <NotFoundPage />
      </MemoryRouter>
    );

    const linkToMain = screen.getByRole('link', {
      name: TEXT.pages.notFound.link,
    });

    expect(linkToMain).toHaveAttribute('href', '/');
  });
});
