import { Skeleton } from '@ui/Skeleton';
import styles from './NewsDetailsSkeleton.module.scss';

function NewsDetailsSkeleton() {
  return (
    <div className={styles.skeletonContainer}>
      <div className={styles.buttonContainer}>
        <Skeleton className={styles.buttonSkeleton} />
      </div>
      <Skeleton className={styles.imageSkeleton} />
      <Skeleton className={styles.sourceSkeleton} />
      <Skeleton className={styles.authorSkeleton} />
      <Skeleton className={styles.datetimeSkeleton} />
      <Skeleton className={styles.titleSkeleton} />
      <Skeleton className={styles.contentSkeleton} />
      <Skeleton className={styles.urlSkeleton} />
    </div>
  );
}

export default NewsDetailsSkeleton;
