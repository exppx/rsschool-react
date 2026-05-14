import { render, screen } from '@testing-library/react';
import NewsList from './NewsList';
import { TEXT } from '@/constants/text';
import { mockEmptyNews, mockNews } from '@/__tests__/mocks';

describe('NewsList', () => {
  it('should render without breaking', () => {
    render(<NewsList news={mockNews} isLoading={false} error={null} />);

    expect(screen.getByText('Title 1')).toBeInTheDocument();
  });

  it('should render all news', () => {
    render(<NewsList news={mockNews} isLoading={false} error={null} />);

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });

  it('should render error message on error', () => {
    render(<NewsList news={mockNews} isLoading={false} error={'Test error'} />);

    expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
    expect(
      screen.getByText(TEXT.features.news.newsList.fetchError)
    ).toBeInTheDocument();
  });

  it('should render skeleton on loading', () => {
    render(<NewsList news={mockNews} isLoading={true} error={null} />);

    expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
  });

  it('should render placeholder if no news found', () => {
    render(<NewsList news={mockEmptyNews} isLoading={false} error={null} />);

    expect(
      screen.getByText(TEXT.features.news.newsList.placeholder)
    ).toBeInTheDocument();
  });

  it('should render nothing if no news provided', () => {
    const { container } = render(
      <NewsList news={null} isLoading={false} error={null} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
