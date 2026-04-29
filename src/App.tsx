import React from 'react';
import { AppLayout } from '@ui/AppLayout';
import { PokemonsPage } from './pages/PokemonsPage';

class App extends React.Component {
  render() {
    return (
      <AppLayout>
        <PokemonsPage />
      </AppLayout>
    );
  }
}

export default App;
