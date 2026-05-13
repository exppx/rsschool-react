import type { Article } from '@news/types';
import { TEXT } from '@/constants/text';
import { NewsItem } from './NewsItem';
import { NewsListSkeleton } from './NewsListSkeleton';
import { ErrorMessage } from '@ui/ErrorMessage';

import styles from './NewsList.module.scss';

type NewsListProps = {
  news: Article[];
  isLoading: Readonly<boolean>;
  error: Readonly<string | null>;
};

function NewsList({ news, isLoading, error }: NewsListProps) {
  if (error !== null) {
    return (
      <div className={styles.errorContainer}>
        <ErrorMessage message={TEXT.features.news.newsList.fetchError} />
      </div>
    );
  }

  if (isLoading) {
    return <NewsListSkeleton />;
  }

  if (news.length === 0) {
    return (
      <div className={styles.placeholderContainer}>
        <p className={styles.placeholder}>
          {TEXT.features.news.newsList.placeholder}
        </p>
      </div>
    );
  }

  return (
    <ul className={styles.newsList}>
      {news.map((article) => (
        <li key={article.title} className={styles.newsItem}>
          <NewsItem article={article} />
        </li>
      ))}
    </ul>
  );
}

export default NewsList;
