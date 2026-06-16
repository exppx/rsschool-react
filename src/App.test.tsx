import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createTestStore } from './__tests__/createTestStore';
import App from './App';

describe('App', () => {
  it('should render without breaking', () => {
    const store = createTestStore();
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
