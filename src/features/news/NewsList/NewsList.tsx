import type { NewsApiResponse } from '@news/types';
import { TEXT } from '@/constants/text';
import { NewsItem } from './NewsItem';
import { NewsListSkeleton } from './NewsListSkeleton';
import { ErrorMessage } from '@ui/ErrorMessage';

import styles from './NewsList.module.scss';

type NewsListProps = {
  news: NewsApiResponse | null;
  isLoading: boolean;
  error: string | null;
};

function NewsList({ news, isLoading, error }: NewsListProps) {
  if (!news) return;

  const { articles } = news;

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

  if (articles.length === 0) {
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
      {articles.map((article) => (
        <li key={article.title} className={styles.newsItem}>
          <NewsItem article={article} />
        </li>
      ))}
    </ul>
  );
}

export default NewsList;
