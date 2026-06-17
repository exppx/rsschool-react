import { render, screen } from '@testing-library/react';
import Footer from './footer';
import { TEXT } from '@/constants/text';
import { LINKS } from '@/constants/links';

describe('Footer', () => {
  it('should render without breaking', () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: TEXT.ui.footer.creator });

    expect(link).toBeInTheDocument();
  });

  it("should have link to creator's GitHub account", () => {
    render(<Footer />);

    const link = screen.getByRole('link', { name: TEXT.ui.footer.creator });

    expect(link).toHaveAttribute('href', LINKS.creatorGitHub);
  });
});
