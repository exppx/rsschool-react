import { render, screen } from '@testing-library/react';
import NewsItem from './NewsItem';
import { mockArticle, mockEmptyArticle } from '@/__tests__/mocks';

describe('NewsItem', () => {
  it('should render without breaking', () => {
    render(<NewsItem article={mockArticle} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
  });

  it('should render title, description and link to the source', () => {
    render(<NewsItem article={mockArticle} />);

    expect(screen.getByText('Title')).toBeInTheDocument();
    expect(screen.getByText('Description')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', 'url');
  });

  it('should not render link if source is not provided', () => {
    render(<NewsItem article={mockEmptyArticle} />);

    expect(screen.queryByRole('link')).not.toBeInTheDocument();
  });
});
