import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

vi.mock('./features/news/SearchNewsForm', () => {
  return {
    SearchNewsForm: class extends React.Component {
      render(): React.ReactNode {
        return <div>Search news form</div>;
      }
    },
  };
});

vi.mock('./features/news/NewsList', () => {
  return {
    NewsList: class extends React.Component {
      render() {
        return <div>News List</div>;
      }
    },
  };
});

describe('App', () => {
  it('should render without breaks', async () => {
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText('Search news form')).toBeInTheDocument();
    });
  });
});
