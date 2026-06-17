import type { NewsApiResponse } from '@/app/(news)/_types';
import { API_PAGE_SIZE } from '@/constants/numbers';
import { PAGE_KEY } from '@/constants/searchParamsKeys';
import { TEXT } from '@/constants/text';
import { NewsItem } from './news-item';
import { ErrorMessage } from '@/components/error-message';
import { Pagination } from '@/components/pagination';

import styles from './news-list.module.scss';

type NewsListProps = {
  news: NewsApiResponse;
  isError: boolean;
  page: string;
  query: string;
};

function NewsList({ news, isError, page, query }: NewsListProps) {
  if (isError) {
    return (
      <div className={styles['error-container']}>
        <ErrorMessage message={TEXT.features.news.newsList.fetchError} />
      </div>
    );
  }

  const { articles, totalResults } = news;

  if (articles.length === 0) {
    return (
      <div className={styles['placeholder-container']}>
        <p className={styles['placeholder']}>
          {TEXT.features.news.newsList.placeholder}
        </p>
      </div>
    );
  }

  return (
    <div>
      <ul className={styles['news-list']}>
        {articles.map((article) => (
          <li
            key={`${article.title}${article.publishedAt}`}
            className={styles['news-item']}
          >
            <NewsItem article={article} page={page} query={query} />
          </li>
        ))}
      </ul>

      <div className={styles['pagination-container']}>
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
