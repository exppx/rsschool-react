import React from 'react';
import type { Size } from '@/types/styling';

import styles from './input.module.scss';

type InputProps = {
  styleSize?: Size;
} & React.ComponentProps<'input'>;

function Input({ styleSize, className, ...rest }: InputProps) {
  function getClassName(styleSize: InputProps['styleSize']) {
    let sizeClassName = '';

    switch (styleSize) {
      case 'small':
        sizeClassName += styles['input_small'];
        break;
      case 'medium':
        sizeClassName += styles['input_medium'];
        break;
      case 'large':
        sizeClassName += styles['input_large'];
        break;
      case undefined:
        sizeClassName += styles['input_medium'];
        break;
    }

    return `${styles['input']} ${sizeClassName} ${className ?? ''}`;
  }

  return <input {...rest} className={getClassName(styleSize)} />;
}

export default Input;
