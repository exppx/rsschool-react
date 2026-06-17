'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslations } from 'next-intl';
import { usePathname } from '@/i18n/navigation';
import { Link } from '@/i18n/navigation';
import { Button } from '@/components/button';
import { BuggyComponent } from '@/components/buggy-component';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { newsApi } from '@/app/[locale]/(news)/_api/newsApi';
import LocaleSwitcher from '../locale-switcher/locale-switcher';

import styles from './header.module.scss';

function Header() {
  const t = useTranslations('components.header');
  const pathName = usePathname();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  return (
    <header className={styles['header']}>
      <div className={styles['wrapper']}>
        <h1 className={styles['heading']}>{t('title')}</h1>

        <nav className={styles['nav']}>
          <Link
            href="/"
            prefetch={false}
            className={
              pathName === '/'
                ? `${styles['nav-link']} ${styles['nav-link_active']}`
                : styles['nav-link']
            }
          >
            {t('home')}
          </Link>
          <Link
            href="/about"
            prefetch={false}
            className={
              pathName === '/about'
                ? `${styles['nav-link']} ${styles['nav-link_active']}`
                : styles['nav-link']
            }
          >
            {t('about')}
          </Link>

          <ThemeToggleButton />

          <LocaleSwitcher />

          <Button
            variant="success"
            className={styles['invalidate-cache-button']}
            onClick={() => {
              dispatch(newsApi.util.invalidateTags([{ type: 'News' }]));
            }}
          >
            {t('invalidateCache')}
          </Button>

          <Button
            variant="error"
            className={styles['error-button']}
            onClick={() => {
              setIsError(true);
            }}
          >
            {t('errorButton')}
          </Button>
        </nav>
      </div>

      {isError && <BuggyComponent shouldThrow />}
    </header>
  );
}

export default Header;
