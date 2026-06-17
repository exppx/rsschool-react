import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

import styles from './not-found.module.scss';

function NotFound() {
  const t = useTranslations('pages.notFound');

  return (
    <div className={styles['not-found-page']}>
      <div className={styles['block']}>
        <h2 className={styles['heading']}>{t('forOhFor')}</h2>
        <p className={styles['not-found']}>{t('notFound')}</p>
      </div>
      <div className={styles['block']}>
        <p className={styles['description']}>{t('description')}</p>
        <Link href="/" className={styles['link']}>
          {t('link')}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
