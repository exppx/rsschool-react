import { render, screen } from '@testing-library/react';
import NewsItem from './NewsItem';
import type { Article } from '../../types';

const mockArticle: Article = {
  source: {
    id: '1',
    name: 'Name',
  },
  author: 'Author',
  title: 'Title',
  description: 'Description',
  url: 'url',
  urlToImage: 'url to image',
  publishedAt: '2000-01-01T00:00:00Z',
  content: 'Content',
};

const mockEmptyArticle: Article = {
  source: {
    id: null,
    name: null,
  },
  author: null,
  title: null,
  description: null,
  url: null,
  urlToImage: null,
  publishedAt: '2000-01-01T00:00:00Z',
  content: null,
};

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
