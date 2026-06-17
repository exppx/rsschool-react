import { render, screen } from '@testing-library/react';
import ErrorMessage from './error-message';
import { TEXT } from '@/constants/text';

describe('ErrorMessage', () => {
  it('should render without breaking', () => {
    const message = 'test message';
    render(<ErrorMessage message={message} />);

    expect(screen.getByText(TEXT.ui.errorMessage.heading)).toBeInTheDocument();
    expect(screen.getByText(message)).toBeInTheDocument();
  });
});
