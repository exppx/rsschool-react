import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { TEXT } from '@/constants/text';
import { TestErrorBoundary } from '@/__tests__/components';
import { createTestStore } from '@/__tests__/store';
import Header from './header';

import styles from './Header.module.scss';

describe('Header', () => {
  function customRender(options?: { initialEntries?: string[] }) {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={options?.initialEntries ?? ['/']}>
          <Header />
        </MemoryRouter>
      </Provider>
    );

    return {
      store,
    };
  }

  it('should render without breaking', () => {
    customRender();

    expect(
      screen.getByRole('heading', { name: TEXT.ui.header.title })
    ).toBeInTheDocument();
  });

  it('should set class of active link according to path', () => {
    customRender();

    expect(screen.getByRole('link', { name: TEXT.ui.header.home })).toHaveClass(
      styles['nav-link_active']
    );
  });

  it('should set class of active link according to path', () => {
    customRender({ initialEntries: ['/about'] });

    expect(
      screen.getByRole('link', { name: TEXT.ui.header.about })
    ).toHaveClass(styles['nav-link_active']);
  });

  it('should throw an error when button is clicked', async () => {
    const message = 'error happened';
    const store = createTestStore();
    render(
      <Provider store={store}>
        <MemoryRouter>
          <TestErrorBoundary message={message}>
            <Header />
          </TestErrorBoundary>
        </MemoryRouter>
      </Provider>
    );
    const user = userEvent.setup();

    const button = screen.getByRole('button', {
      name: TEXT.ui.header.errorButton,
    });
    await user.click(button);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
