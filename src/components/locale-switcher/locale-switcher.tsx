import Link from 'next/link';
import { useLocale } from 'next-intl';

import styles from './locale-switcher.module.scss';

function LocaleSwitcher() {
  const locale = useLocale();

  const nextLocale = locale === 'en' ? 'ru' : 'en';

  return (
    <Link
      href={`/${nextLocale}`}
      prefetch={false}
      className={styles['locale-switcher']}
    >
      {nextLocale}
    </Link>
  );
}

export default LocaleSwitcher;
