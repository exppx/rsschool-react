import { render, screen } from '@testing-library/react';
import NewsList from './NewsList';
import { TEXT } from '@/constants/text';
import { mockEmptyNews, mockNews } from '@/__tests__/mocks';
import type React from 'react';
import { MemoryRouter } from 'react-router';
import userEvent from '@testing-library/user-event';
import { PathDisplay } from '@/__tests__/components';

describe('NewsList', () => {
  function customRender(node: React.ReactNode) {
    const { container } = render(
      <MemoryRouter initialEntries={['/?page=1']}>{node}</MemoryRouter>
    );

    return { container };
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

  it('should close details on click', async () => {
    render(
      <MemoryRouter initialEntries={['/details/?page=1']}>
        <NewsList news={mockNews} isLoading={false} isError={false} />
        <PathDisplay />
      </MemoryRouter>
    );
    const user = userEvent.setup();
    const pathDisplay = screen.getByTestId('path');

    const listArea = screen.getByRole('list');
    await user.click(listArea);

    expect(pathDisplay.textContent).toBe('/');
  });
});
