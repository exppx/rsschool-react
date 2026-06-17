import { render, screen } from '@testing-library/react';
import NewsList from './news-list';
import { TEXT } from '@/constants/text';
import { mockEmptyNews, mockNews } from '@/__tests__/mocks';
import type React from 'react';
import { MemoryRouter } from 'react-router';
import { createTestStore } from '@/__tests__/store';
import { Provider } from 'react-redux';

describe('NewsList', () => {
  function customRender(node: React.ReactNode) {
    const store = createTestStore();

    return {
      store,
      ...render(
        <Provider store={store}>
          <MemoryRouter initialEntries={['/?page=1']}>{node}</MemoryRouter>
        </Provider>
      ),
    };
  }

  it('should render without breaking', () => {
    customRender(
      <NewsList news={mockNews} isLoading={false} isError={false} />
    );

    expect(screen.getByText('Title 1')).toBeInTheDocument();
  });

  it('should render all news', () => {
    customRender(
      <NewsList news={mockNews} isLoading={false} isError={false} />
    );

    expect(screen.getByText('Title 1')).toBeInTheDocument();
    expect(screen.getByText('Title 2')).toBeInTheDocument();
  });

  it('should render error message on error', () => {
    customRender(<NewsList news={mockNews} isLoading={false} isError={true} />);

    expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
    expect(
      screen.getByText(TEXT.features.news.newsList.fetchError)
    ).toBeInTheDocument();
  });

  it('should render skeleton on loading', () => {
    customRender(<NewsList news={mockNews} isLoading={true} isError={false} />);

    expect(screen.queryByText('Title 1')).not.toBeInTheDocument();
  });

  it('should render placeholder if no news found', () => {
    customRender(
      <NewsList news={mockEmptyNews} isLoading={false} isError={false} />
    );

    expect(
      screen.getByText(TEXT.features.news.newsList.placeholder)
    ).toBeInTheDocument();
  });

  it('should render nothing if no news provided', () => {
    const { container } = customRender(
      <NewsList news={null} isLoading={false} isError={false} />
    );

    expect(container).toBeEmptyDOMElement();
  });
});
