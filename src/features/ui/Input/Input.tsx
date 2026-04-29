import React from 'react';
import type { Size } from '@/types/styling';

import styles from './Input.module.scss';

type InputProps = {
  styleSize?: Size;
} & React.ComponentProps<'input'>;

class Input extends React.Component<InputProps> {
  getClassName(styleSize: InputProps['styleSize']) {
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

    return `${styles.input} ${sizeClassName} ${this.props.className ?? ''}`;
  }

  render() {
    const { styleSize, ...rest } = this.props;

    return <input {...rest} className={this.getClassName(styleSize)} />;
  }
}

export default Input;
