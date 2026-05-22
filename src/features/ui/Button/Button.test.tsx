import type { Size } from '@/types/styling';
import { render, screen } from '@testing-library/react';
import Button from './Button';

import styles from './Button.module.scss';
import userEvent from '@testing-library/user-event';

describe('Button', () => {
  it('should render without breaking', () => {
    const testText = 'text text';
    render(<Button>{testText}</Button>);

    expect(screen.getByRole('button', { name: testText })).toBeInTheDocument();
  });

  it.each<{ size: Size; className: string }>([
    { size: 'small', className: styles.buttonSmall },
    { size: 'medium', className: styles.buttonMedium },
    { size: 'large', className: styles.buttonLarge },
  ])(
    'should have class $className if size $size specified',
    ({ size, className }) => {
      render(<Button styleSize={size} />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(className);
    }
  );

  it(`should have class ${styles.buttonMedium} if no size specified`, () => {
    render(<Button />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(styles.buttonMedium);
  });

  it.each<{
    variant: React.ComponentProps<typeof Button>['variant'];
    className: string;
  }>([
    { variant: 'primary', className: styles.buttonPrimary },
    { variant: 'secondary', className: styles.buttonSecondary },
    { variant: 'error', className: styles.buttonError },
    { variant: 'success', className: styles.buttonSuccess },
  ])(
    'should have class $className if variant $variant specified',
    ({ variant, className }) => {
      render(<Button variant={variant} />);
      const button = screen.getByRole('button');

      expect(button).toHaveClass(className);
    }
  );

  it(`should have class ${styles.buttonPrimary} if no variant specified`, () => {
    render(<Button />);
    const button = screen.getByRole('button');

    expect(button).toHaveClass(styles.buttonPrimary);
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
