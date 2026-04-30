import React from 'react';
import { AppLayout } from '@ui/AppLayout';
import { NewsPage } from './pages/NewsPage';
import { ErrorBoundary } from '@ui/ErrorBoundary';
import { Fallback } from '@ui/Fallback';

class App extends React.Component {
  render() {
    return (
      <ErrorBoundary fallback={<Fallback />}>
        <AppLayout>
          <NewsPage />
        </AppLayout>
      </ErrorBoundary>
    );
  }
}

export default App;
