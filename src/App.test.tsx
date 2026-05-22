import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from './__tests__/store';
import App from './App';

describe('App', () => {
  it('should render without breaks', async () => {
    const store = createTestStore();

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
