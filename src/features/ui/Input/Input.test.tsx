import { render, screen } from '@testing-library/react';
import Input from './Input';
import type { Size } from '@/types/styling';

import styles from './Input.module.scss';

describe('Input', () => {
  it('should render without breaking', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it.each<{ size: Size; className: string }>([
    { size: 'small', className: styles.inputSmall },
    { size: 'medium', className: styles.inputMedium },
    { size: 'large', className: styles.inputLarge },
  ])(
    'should have class $className if size $size specified',
    ({ size, className }) => {
      render(<Input styleSize={size} />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveClass(className);
    }
  );

  it(`should have class ${styles.inputMedium} if no size specified`, () => {
    render(<Input />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass(styles.inputMedium);
  });
});
