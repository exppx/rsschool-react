import { setRequestLocale } from 'next-intl/server';
import { useTranslations } from 'next-intl';
import { LINKS } from '@/constants/links';

import styles from './page.module.scss';
import { routing } from '@/i18n/routing';
import { use } from 'react';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = use(params);
  setRequestLocale(locale);
  const t = useTranslations('pages.about');

  return (
    <div className={styles['about-page']}>
      <h2 className={styles['heading']}>{t('heading')}</h2>

      <div className={styles['text-container']}>
        <p className={styles['text']}>
          {t('description1')}
          <a href={LINKS.creatorGitHub}>{t('authorName')}</a>
          {t('description2')}
        </p>
        <a
          className={styles['link']}
          href={LINKS.rsSchoolReact}
          target="_blank"
        >
          {t('rsSchoolReact')}
        </a>
      </div>
    </div>
  );
}

export default Page;
