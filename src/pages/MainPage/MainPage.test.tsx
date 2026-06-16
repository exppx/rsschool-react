import { createTestStore } from '@/__tests__/createTestStore';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import MainPage from './MainPage';
import userEvent from '@testing-library/user-event';

describe('MainPage', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);

  function customRender() {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MainPage />
      </Provider>
    );

    const user = userEvent.setup();

    const uncontrolledModalButton = screen.getByRole('button', {
      name: /^uncontrolled/i,
    });
    const controlledModalButton = screen.getByRole('button', {
      name: /^controlled/i,
    });

    return {
      user,
      uncontrolledModalButton,
      controlledModalButton,
    };
  }

  it('should render without breaking', () => {
    const { uncontrolledModalButton } = customRender();

    expect(uncontrolledModalButton).toBeInTheDocument();
  });

  it('should open uncontrolled modal on "Uncontrolled" button click', async () => {
    const { user, uncontrolledModalButton } = customRender();

    await user.click(uncontrolledModalButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('should open controlled modal on "Controlled" button click', async () => {
    const { user, controlledModalButton } = customRender();

    await user.click(controlledModalButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();
  });

  it('should close uncontrolled modal on "Close" button click', async () => {
    const { user, uncontrolledModalButton } = customRender();

    await user.click(uncontrolledModalButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close button/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('should close controlled modal on "Close" button click', async () => {
    const { user, controlledModalButton } = customRender();

    await user.click(controlledModalButton);

    expect(await screen.findByRole('dialog')).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /close button/i }));

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });
});
