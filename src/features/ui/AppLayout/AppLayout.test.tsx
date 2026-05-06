import { render, screen } from '@testing-library/react';
import AppLayout from './AppLayout';

describe('AppLayout', () => {
  it('should render without breaking', () => {
    const testText = 'Test text';
    const testChildren = <button>{testText}</button>;
    render(<AppLayout>{testChildren}</AppLayout>);

    expect(screen.getByRole('button', { name: testText })).toBeInTheDocument();
  });
});
