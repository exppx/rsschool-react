import type { Size } from '@/types/styling';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Button from './button';

import styles from './Button.module.scss';

describe('Button', () => {
  it('should render without breaking', () => {
    const testText = 'text text';
    render(<Button>{testText}</Button>);

    expect(screen.getByRole('button', { name: testText })).toBeInTheDocument();
  });

  it.each<{ size: Size; className: string }>([
    { size: 'small', className: styles['button_small'] },
    { size: 'medium', className: styles['button_medium'] },
    { size: 'large', className: styles['button_large'] },
  ])(
    'should have class $className if size $size specified',
    ({ size, className }) => {
      render(<Button styleSize={size} />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(className);
    }
  );

  it(`should have class ${styles['button_medium']} if no size specified`, () => {
    render(<Button />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(styles['button_medium']);
  });

  it.each<{
    variant: React.ComponentProps<typeof Button>['variant'];
    className: string;
  }>([
    { variant: 'primary', className: styles['button_primary'] },
    { variant: 'secondary', className: styles['button_secondary'] },
    { variant: 'error', className: styles['button_error'] },
    { variant: 'success', className: styles['button_success'] },
  ])(
    'should have class $className if variant $variant specified',
    ({ variant, className }) => {
      render(<Button variant={variant} />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(className);
    }
  );

  it(`should have class ${styles['button_primary']} if no variant specified`, () => {
    render(<Button />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(styles['button_primary']);
  });

  it('should launch onClick handler on click', async () => {
    const mockFn = vi.fn();
    render(<Button onClick={mockFn} />);
    const button = screen.getByRole('button');
    const user = userEvent.setup();

    await user.click(button);

    expect(mockFn).toHaveBeenCalledTimes(1);
  });
});
