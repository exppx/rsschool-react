import type { NewsApiResponse } from '@news/types';
import { TEXT } from '@/constants/text';
import { API_PAGE_SIZE } from '@/constants/numbers';
import { PAGE_KEY } from '@/constants/searchParamsKeys';
import { NewsItem } from './NewsItem';
import { NewsListSkeleton } from './NewsListSkeleton';
import { ErrorMessage } from '@ui/ErrorMessage';
import { Pagination } from '@ui/Pagination';

import styles from './NewsList.module.scss';

type NewsListProps = {
  news: NewsApiResponse | null;
  isLoading: boolean;
  error: string | null;
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

  if (!news) return;

  const { articles, totalResults } = news;

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
    <div>
      <ul className={styles.newsList}>
        {articles.map((article) => (
          <li key={article.title} className={styles.newsItem}>
            <NewsItem article={article} />
          </li>
        ))}
      </ul>

      <div className={styles.paginationContainer}>
        <Pagination
          totalItems={totalResults}
          pageSize={API_PAGE_SIZE}
          queryKey={PAGE_KEY}
        />
      </div>
    </div>
  );
}

export default NewsList;
