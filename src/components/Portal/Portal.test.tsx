import { render, screen } from '@testing-library/react';
import Portal from './Portal';

describe('Portal', () => {
  const modalRoot = document.createElement('div');
  modalRoot.setAttribute('id', 'modal-root');
  document.body.appendChild(modalRoot);

  function customRender() {
    const testText = 'Test text';

    render(
      <Portal>
        <div>{testText}</div>
      </Portal>
    );

    return {
      testText,
    };
  }

  it('should render without breaking', () => {
    const { testText } = customRender();

    expect(screen.getByText(testText)).toBeInTheDocument();
  });
});
