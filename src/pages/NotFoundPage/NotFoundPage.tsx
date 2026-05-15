import { Link } from 'react-router';
import { TEXT } from '@/constants/text';

import styles from './NotFoundPage.module.scss';

function NotFoundPage() {
  return (
    <div className={styles.notFoundPage}>
      <div className={styles.block}>
        <h2 className={styles.heading}>{TEXT.pages.notFound.forOhFor}</h2>
        <p className={styles.notFound}>{TEXT.pages.notFound.notFound}</p>
      </div>
      <div className={styles.block}>
        <p className={styles.description}>{TEXT.pages.notFound.description}</p>
        <Link to="/" className={styles.link}>
          {TEXT.pages.notFound.link}
        </Link>
      </div>
    </div>
  );
}

export default NotFoundPage;
