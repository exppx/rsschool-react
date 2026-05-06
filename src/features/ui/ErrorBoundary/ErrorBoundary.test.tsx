import { render, screen } from '@testing-library/react';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';

class ThrowingComponent extends React.Component<{
  shouldThrow: boolean;
  children: React.ReactNode;
}> {
  render() {
    if (this.props.shouldThrow) throw new Error();

    return this.props.children;
  }
}

describe('ErrorBoundary', () => {
  function setup(shouldThrow: boolean) {
    const childrenText = 'Children text';
    const fallbackText = 'Fallback text';

    render(
      <ErrorBoundary fallback={<div>{fallbackText}</div>}>
        <ThrowingComponent shouldThrow={shouldThrow}>
          <div>{childrenText}</div>
        </ThrowingComponent>
      </ErrorBoundary>
    );

    return { childrenText, fallbackText };
  }

  it('should render children if did not catch error', () => {
    const { childrenText, fallbackText } = setup(false);

    expect(screen.getByText(childrenText)).toBeInTheDocument();
    expect(screen.queryByText(fallbackText)).not.toBeInTheDocument();
  });

  it('should render fallback ui if catch error', () => {
    const { childrenText, fallbackText } = setup(true);

    expect(screen.getByText(fallbackText)).toBeInTheDocument();
    expect(screen.queryByText(childrenText)).not.toBeInTheDocument();
  });
});
