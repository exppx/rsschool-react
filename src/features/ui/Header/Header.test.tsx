import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Header from './Header';
import { TEXT } from '@/constants/text';
import { TestErrorBoundary } from '@/__tests__/components';

import styles from './Header.module.scss';

describe('Header', () => {
  it('should render without breaking', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: TEXT.ui.header.title })
    ).toBeInTheDocument();
  });

  it('should set class of active link according to path', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <Header />
      </MemoryRouter>
    );

    expect(screen.getByRole('link', { name: TEXT.ui.header.home })).toHaveClass(
      styles.navLinkActive
    );
  });

  it('should set class of active link according to path', () => {
    render(
      <MemoryRouter initialEntries={['/about']}>
        <Header />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('link', { name: TEXT.ui.header.about })
    ).toHaveClass(styles.navLinkActive);
  });

  it('should throw an error when button is clicked', async () => {
    const message = 'error happened';
    render(
      <MemoryRouter>
        <TestErrorBoundary message={message}>
          <Header />
        </TestErrorBoundary>
      </MemoryRouter>
    );
    const button = screen.getByRole('button', {
      name: TEXT.ui.header.errorButton,
    });
    const user = userEvent.setup();

    await user.click(button);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
