import React from 'react';
import { AppLayout } from '@ui/AppLayout';
import { NewsPage } from './pages/NewsPage';

class App extends React.Component {
  render() {
    return (
      <AppLayout>
        <NewsPage />
      </AppLayout>
    );
  }
}

export default App;
