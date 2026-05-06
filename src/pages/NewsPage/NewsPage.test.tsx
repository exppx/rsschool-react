import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mockNews } from '@/__tests__/mocks';
import type { SearchNewsForm } from '@/features/news';
import NewsPage from './NewsPage';

vi.mock('../../features/news/SearchNewsForm', () => {
  return {
    SearchNewsForm: class extends React.Component<
      React.ComponentProps<typeof SearchNewsForm>
    > {
      componentDidMount(): void {
        this.props.onNewsReceived(mockNews);
        this.props.setError(null);
        this.props.setIsLoading(false);
      }

      render(): React.ReactNode {
        return <div>Search news form</div>;
      }
    },
  };
});

vi.mock('../../features/news/NewsList', () => {
  return {
    NewsList: class extends React.Component {
      render() {
        return <div>News List</div>;
      }
    },
  };
});

describe('NewsPage', () => {
  it('should render without breaking', async () => {
    render(<NewsPage />);

    await waitFor(() => {
      expect(screen.getByText('Search news form')).toBeInTheDocument();
    });
  });
});
