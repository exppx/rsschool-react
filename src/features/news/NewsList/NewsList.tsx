import { useNavigate, useSearchParams } from 'react-router';
import type { NewsApiResponse } from '@news/types';
import { TEXT } from '@/constants/text';
import { API_PAGE_SIZE } from '@/constants/numbers';
import { DETAILS_KEY, PAGE_KEY } from '@/constants/searchParamsKeys';
import { NewsItem } from './NewsItem';
import { NewsListSkeleton } from './NewsListSkeleton';
import { ErrorMessage } from '@ui/ErrorMessage';
import { Pagination } from '@ui/Pagination';

import styles from './NewsList.module.scss';

type NewsListProps = {
  news: NewsApiResponse | null;
  isLoading: boolean;
  isError: boolean;
};

function NewsList({ news, isLoading, isError }: NewsListProps) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  function handleCloseDetails() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(DETAILS_KEY);

    const url = `/?${newParams.toString()}`;

    navigate(url);
  }

  if (isError) {
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
    <div
      onClickCapture={() => {
        handleCloseDetails();
      }}
    >
      <ul className={styles.newsList}>
        {articles.map((article) => (
          <li
            key={`${article.title}${article.publishedAt}`}
            className={styles.newsItem}
          >
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
