import React from 'react';
import type { Size } from '@/types/styling';

import styles from './Input.module.scss';

type InputProps = {
  styleSize?: Size;
} & React.ComponentProps<'input'>;

function Input({ styleSize, className, ...rest }: InputProps) {
  function getClassName(styleSize: InputProps['styleSize']) {
    let sizeClassName = '';

    switch (styleSize) {
      case 'small':
        sizeClassName += styles.inputSmall;
        break;
      case 'medium':
        sizeClassName += styles.inputMedium;
        break;
      case 'large':
        sizeClassName += styles.inputLarge;
        break;
      case undefined:
        sizeClassName += styles.inputMedium;
        break;
    }

    return `${styles.input} ${sizeClassName} ${className ?? ''}`;
  }

  return <input {...rest} className={getClassName(styleSize)} />;
}

export default Input;
