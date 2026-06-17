import Link from 'next/link';
import { useLocale } from 'next-intl';
import { usePathname, useSearchParams } from 'next/navigation';

import styles from './locale-switcher.module.scss';

function LocaleSwitcher() {
  const pathName = usePathname();
  const searchParams = useSearchParams();
  const locale = useLocale();

  const nextLocale = locale === 'en' ? 'ru' : 'en';
  const segments = pathName.split('/');
  segments[1] = nextLocale;

  return (
    <Link
      href={`${segments.join('/')}?${searchParams.toString()}`}
      prefetch={false}
      className={styles['locale-switcher']}
    >
      {nextLocale}
    </Link>
  );
}

export default LocaleSwitcher;
