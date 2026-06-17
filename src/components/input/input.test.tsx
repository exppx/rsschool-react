import { render, screen } from '@testing-library/react';
import Input from './input';
import type { Size } from '@/types/styling';

import styles from './Input.module.scss';

describe('Input', () => {
  it('should render without breaking', () => {
    render(<Input />);

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it.each<{ size: Size; className: string }>([
    { size: 'small', className: styles['input_small'] },
    { size: 'medium', className: styles['input_medium'] },
    { size: 'large', className: styles['input_large'] },
  ])(
    'should have class $className if size $size specified',
    ({ size, className }) => {
      render(<Input styleSize={size} />);
      const input = screen.getByRole('textbox');

      expect(input).toHaveClass(className);
    }
  );

  it(`should have class ${styles['input_medium']} if no size specified`, () => {
    render(<Input />);
    const input = screen.getByRole('textbox');

    expect(input).toHaveClass(styles['input_medium']);
  });
});
