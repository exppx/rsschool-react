import React from 'react';
import type { Size, Variant } from '@/types/styling';

import styles from './Button.module.scss';

type ButtonProps = {
  variant?: Extract<Variant, 'primary' | 'secondary' | 'error'>;
  styleSize?: Size;
} & React.ComponentProps<'button'>;

class Button extends React.Component<ButtonProps> {
  getClassName(
    variant: ButtonProps['variant'],
    styleSize: ButtonProps['styleSize']
  ) {
    let variantClassName = '';

    switch (variant) {
      case 'primary':
        variantClassName += styles.buttonPrimary;
        break;
      case 'secondary':
        variantClassName += styles.buttonSecondary;
        break;
      case 'error':
        variantClassName += styles.buttonError;
        break;
      case undefined:
        variantClassName += styles.buttonPrimary;
        break;
    }

    let sizeClassName = '';

    switch (styleSize) {
      case 'small':
        sizeClassName += styles.buttonSmall;
        break;
      case 'medium':
        sizeClassName += styles.buttonMedium;
        break;
      case 'large':
        sizeClassName += styles.buttonLarge;
        break;
      case undefined:
        sizeClassName += styles.buttonMedium;
        break;
    }

    return `${styles.button} ${variantClassName} ${sizeClassName} ${this.props.className ?? ''}`;
  }

  render() {
    const { variant, styleSize, children, ...rest } = this.props;

    return (
      <button {...rest} className={this.getClassName(variant, styleSize)}>
        {children}
      </button>
    );
  }
}

export default Button;
