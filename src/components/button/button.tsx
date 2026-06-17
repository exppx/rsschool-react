import React from 'react';
import type { Size, Variant } from '@/types/styling';

import styles from './button.module.scss';

type ButtonProps = {
  variant?: Extract<Variant, 'primary' | 'secondary' | 'error' | 'success'>;
  styleSize?: Size;
} & React.ComponentProps<'button'>;

function Button({
  variant,
  styleSize,
  children,
  className,
  ...rest
}: ButtonProps) {
  function getClassName(
    variant: ButtonProps['variant'],
    styleSize: ButtonProps['styleSize']
  ) {
    let variantClassName = '';

    switch (variant) {
      case 'primary':
        variantClassName += styles['button_primary'];
        break;
      case 'secondary':
        variantClassName += styles['button_secondary'];
        break;
      case 'error':
        variantClassName += styles['button_error'];
        break;
      case 'success':
        variantClassName += styles['button_success'];
        break;
      case undefined:
        variantClassName += styles['button_primary'];
        break;
    }

    let sizeClassName = '';

    switch (styleSize) {
      case 'small':
        sizeClassName += styles['button_small'];
        break;
      case 'medium':
        sizeClassName += styles['button_medium'];
        break;
      case 'large':
        sizeClassName += styles['button_large'];
        break;
      case undefined:
        sizeClassName += styles['button_medium'];
        break;
    }

    return `${styles['button']} ${variantClassName} ${sizeClassName} ${className ?? ''}`;
  }

  return (
    <button {...rest} className={getClassName(variant, styleSize)}>
      {children}
    </button>
  );
}

export default Button;
