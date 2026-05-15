import { TEXT } from '@/constants/text';

import styles from './ErrorMessage.module.scss';

type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div className={styles.errorContainer}>
      <p className={styles.errorHeading}>{TEXT.ui.errorMessage.heading}</p>
      <p className={styles.errorMessage}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
