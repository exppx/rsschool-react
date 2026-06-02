import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Modal from './Modal';
import type React from 'react';

describe('Modal', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);

  function customRender(options?: {
    isOpen?: boolean;
    onClose?: () => void;
    content?: React.ReactNode;
    title?: string;
  }) {
    const emptyFunc = () => {};

    render(
      <Modal
        title={options?.title ?? 'test'}
        onClose={options?.onClose ?? emptyFunc}
        isOpen={options?.isOpen ?? true}
      >
        {options?.content || <div></div>}
      </Modal>
    );

    const user = userEvent.setup();

    return {
      user,
    };
  }

  it('should render without breaking', () => {
    customRender();
  });

  it('should render content if is open', () => {
    customRender({ isOpen: true, content: <div>Content</div> });

    expect(screen.getByText(/content/i)).toBeInTheDocument();
  });

  it('should not render content if is not open', () => {
    customRender({ isOpen: false, content: <div>Content</div> });
    screen.debug();
    expect(screen.queryByText(/content/i)).not.toBeInTheDocument();
  });

  it('should trigger onClose on close button click', async () => {
    const onClose = vi.fn();
    const { user } = customRender({
      isOpen: true,
      onClose,
    });

    const closeButton = screen.getByRole('button');
    await user.click(closeButton);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should trigger onClose on overlay click', async () => {
    const onClose = vi.fn();
    const { user } = customRender({
      isOpen: true,
      onClose,
    });

    const overlay = screen.getByRole('dialog');
    await user.click(overlay);

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should trigger onClose on escape key press', async () => {
    const onClose = vi.fn();
    const { user } = customRender({
      isOpen: true,
      onClose,
    });

    await user.keyboard('{Escape}');

    expect(onClose).toHaveBeenCalledOnce();
  });

  it('should focus on close button when opened', () => {
    customRender({ isOpen: true });

    const closeButton = screen.getByRole('button');

    expect(closeButton).toHaveFocus();
  });

  it('should allow navigation with Tab', async () => {
    const { user } = customRender({
      isOpen: true,
      content: (
        <>
          <input data-testid="test1" />
          <input data-testid="test2" />
        </>
      ),
    });

    const input1 = screen.getByTestId('test1');
    const input2 = screen.getByTestId('test2');
    const closeButton = screen.getByRole('button');

    expect(closeButton).toHaveFocus();

    await user.tab();
    expect(input1).toHaveFocus();

    await user.tab();
    expect(input2).toHaveFocus();

    await user.tab();
    expect(closeButton).toHaveFocus();
  });

  it('should allow backward navigation with shift + Tab', async () => {
    const { user } = customRender({
      isOpen: true,
      content: (
        <>
          <input data-testid="test1" />
          <input data-testid="test2" />
        </>
      ),
    });

    const input1 = screen.getByTestId('test1');
    const input2 = screen.getByTestId('test2');
    const closeButton = screen.getByRole('button');

    expect(closeButton).toHaveFocus();

    await user.tab({ shift: true });
    expect(input2).toHaveFocus();

    await user.tab({ shift: true });
    expect(input1).toHaveFocus();

    await user.tab({ shift: true });
    expect(closeButton).toHaveFocus();
  });
});
