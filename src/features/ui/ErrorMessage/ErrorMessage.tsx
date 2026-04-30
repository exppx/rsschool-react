import React from 'react';
import { TEXT } from '@/constants/text';

import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  message: string;
};

class ErrorMessage extends React.Component<ErrorMessageProps> {
  render() {
    return (
      <div className={styles.errorContainer}>
        <p className={styles.errorHeading}>{TEXT.ui.errorMessage.heading}</p>
        <p className={styles.errorMessage}>{this.props.message}</p>
      </div>
    );
  }
}

export default ErrorMessage;
