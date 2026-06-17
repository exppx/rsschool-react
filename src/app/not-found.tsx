import Link from 'next/link';
import { TEXT } from '@/constants/text';

import styles from './not-found.module.scss';

function NotFound() {
  return (
    <div className={styles['not-found-page']}>
      <div className={styles['block']}>
        <h2 className={styles['heading']}>{TEXT.pages.notFound.forOhFor}</h2>
        <p className={styles['not-found']}>{TEXT.pages.notFound.notFound}</p>
      </div>
      <div className={styles['block']}>
        <p className={styles['description']}>
          {TEXT.pages.notFound.description}
        </p>
        <Link href="/" className={styles['link']}>
          {TEXT.pages.notFound.link}
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
