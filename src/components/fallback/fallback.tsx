import { useTranslations } from 'next-intl';

import '@/app/globals.scss';
import styles from './fallback.module.scss';

function Fallback() {
  const t = useTranslations('components.fallback');

  return (
    <div className={styles['fallback-container']}>
      <h1>{t('heading')}</h1>
      <p className={styles['fallback__message']}>{t('message')}</p>
    </div>
  );
}

export default Fallback;
