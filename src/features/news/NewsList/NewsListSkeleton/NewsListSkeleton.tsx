import { NEWS_SKELETONS_COUNT } from '@/constants/numbers';
import { Skeleton } from '@ui/Skeleton';

import styles from './NewsListSkeleton.module.scss';

function NewsListSkeleton() {
  return (
    <div className={styles.newsListSkeleton}>
      {Array.from({ length: NEWS_SKELETONS_COUNT }).map((_, index) => (
        <div key={index} className={styles.newsListItem}>
          <Skeleton className={styles.newsDateSkeleton} />
          <Skeleton className={styles.newsTitleSkeleton} />
          <Skeleton className={styles.newsDescriptionSkeleton} />
          <Skeleton className={styles.newsSourceSkeleton} />
        </div>
      ))}
    </div>
  );
}

export default NewsListSkeleton;
