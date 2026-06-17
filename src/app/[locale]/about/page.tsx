import { getTranslations, setRequestLocale } from 'next-intl/server';
import { LINKS } from '@/constants/links';
import { routing } from '@/i18n/routing';

import styles from './page.module.scss';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

async function Page({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('pages.about');

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
