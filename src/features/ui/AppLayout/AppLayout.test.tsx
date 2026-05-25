import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';
import { MemoryRouter, Route, Routes } from 'react-router';
import { Provider } from 'react-redux';
import { createTestStore } from '@/__tests__/store';

describe('AppLayout', () => {
  it('should render without breaking', () => {
    const testText = 'Test text';
    const testChildren = <button>{testText}</button>;
    const store = createTestStore();

    render(
      <Provider store={store}>
        <MemoryRouter>
          <Routes>
            <Route element={<AppLayout />}>
              <Route path="/" element={testChildren} />
            </Route>
          </Routes>
        </MemoryRouter>
      </Provider>
    );

    expect(screen.getByRole('button', { name: testText })).toBeInTheDocument();
  });
});
