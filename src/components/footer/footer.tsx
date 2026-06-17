import { LINKS } from '@/constants/links';

import styles from './footer.module.scss';
import { useTranslations } from 'next-intl';

function Footer() {
  const t = useTranslations('components.footer');

  return (
    <footer className={styles['footer']}>
      <div className={styles['wrapper']}>
        <div className={styles['credits']}>
          <span>{`${t('createdBy')} `}</span>
          <a href={LINKS.creatorGitHub} target="_blank">
            {t('creator')}
          </a>
          <span>{` ${t('createdIn')}`}</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
