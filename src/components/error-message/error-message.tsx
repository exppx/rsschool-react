import { useTranslations } from 'next-intl';

import styles from './error-message.module.scss';

type ErrorMessageProps = {
  message: string;
};

function ErrorMessage({ message }: ErrorMessageProps) {
  const t = useTranslations('ui.errorMessage');

  return (
    <div className={styles['error-container']}>
      <p className={styles['error__heading']}>{t('heading')}</p>
      <p className={styles['error__message']}>{message}</p>
    </div>
  );
}

export default ErrorMessage;
