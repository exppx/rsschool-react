import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';
import { MemoryRouter, Route, Routes } from 'react-router';

describe('AppLayout', () => {
  it('should render without breaking', () => {
    const testText = 'Test text';
    const testChildren = <button>{testText}</button>;

    render(
      <MemoryRouter>
        <Routes>
          <Route element={<AppLayout />}>
            <Route path="/" element={testChildren} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByRole('button', { name: testText })).toBeInTheDocument();
  });
});
