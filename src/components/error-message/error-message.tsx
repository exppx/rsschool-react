import { TEXT } from '@/constants/text';

import styles from './error-message.module.scss';

type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles['error-container']}>
      <p className={styles['error__heading']}>{TEXT.ui.errorMessage.heading}</p>
      <p className={styles['error__message']}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
