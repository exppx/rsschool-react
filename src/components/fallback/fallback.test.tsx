import { render, screen } from '@testing-library/react';
import Fallback from './fallback';
import { TEXT } from '@/constants/text';

describe('Fallback', () => {
  it('should render without breaking', () => {
    render(<Fallback />);
    const heading = screen.getByRole('heading', {
      name: TEXT.ui.fallback.heading,
    });
    const message = screen.getByText(TEXT.ui.fallback.message);

    expect(heading).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });
});
