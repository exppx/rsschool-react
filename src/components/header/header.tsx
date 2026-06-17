'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { TEXT } from '@/constants/text';
import { Button } from '@/components/button';
import { BuggyComponent } from '@/components/buggy-component';
import { ThemeToggleButton } from '@/components/theme-toggle-button';
import { newsApi } from '@/app/(news)/_api/newsApi';

import styles from './header.module.scss';

function Header() {
  const pathName = usePathname();
  const dispatch = useDispatch();
  const [isError, setIsError] = useState(false);

  return (
    <header className={styles['header']}>
      <div className={styles['wrapper']}>
        <h1 className={styles['heading']}>{TEXT.ui.header.title}</h1>

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
            {TEXT.ui.header.home}
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
            {TEXT.ui.header.about}
          </Link>

          <ThemeToggleButton />

          <Button
            variant="success"
            className={styles['invalidate-cache-button']}
            onClick={() => {
              dispatch(newsApi.util.invalidateTags([{ type: 'News' }]));
            }}
          >
            {TEXT.ui.header.invalidateCache}
          </Button>

          <Button
            variant="error"
            className={styles['error-button']}
            onClick={() => {
              setIsError(true);
            }}
          >
            {TEXT.ui.header.errorButton}
          </Button>
        </nav>
      </div>

      {isError && <BuggyComponent shouldThrow />}
    </header>
  );
}

export default Header;
