import React from 'react';
import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import Header from './Header';
import { TEXT } from '@/constants/text';

type TestErrorBoundaryProps = {
  children: React.ReactNode;
  message: string;
};

class TestErrorBoundary extends React.Component<
  TestErrorBoundaryProps,
  { hasError: boolean }
> {
  constructor(props: TestErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>error happened</div>;
    }

    return this.props.children;
  }
}

describe('Header', () => {
  it('should render without breaking', () => {
    render(<Header />);

    expect(
      screen.getByRole('heading', { name: TEXT.ui.header.title })
    ).toBeInTheDocument();
  });

  it('should throw an error when button is clicked', async () => {
    const message = 'error happened';
    render(
      <TestErrorBoundary message={message}>
        <Header />
      </TestErrorBoundary>
    );
    const button = screen.getByRole('button', {
      name: TEXT.ui.header.errorButton,
    });
    const user = userEvent.setup();

    await user.click(button);

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
