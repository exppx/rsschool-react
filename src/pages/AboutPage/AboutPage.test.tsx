import { render, screen } from '@testing-library/react';
import AboutPage from './AboutPage';
import { TEXT } from '@/constants/text';

describe('AboutPage', () => {
  it('should render without breaking', () => {
    render(<AboutPage />);

    expect(screen.getByText(TEXT.pages.about.heading)).toBeInTheDocument();
  });
});
