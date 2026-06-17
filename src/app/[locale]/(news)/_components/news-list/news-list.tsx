import { useTranslations } from 'next-intl';
import type { NewsApiResponse } from '@/app/[locale]/(news)/_types';
import { API_PAGE_SIZE } from '@/constants/numbers';
import { PAGE_KEY } from '@/constants/searchParamsKeys';
import { ErrorMessage } from '@/components/error-message';
import { Pagination } from '@/components/pagination';
import { NewsItem } from './news-item';

import styles from './news-list.module.scss';

type NewsListProps = {
  news: NewsApiResponse;
  isError: boolean;
  page: string;
  query: string;
};

function NewsList({ news, isError, page, query }: NewsListProps) {
  const t = useTranslations('features.news.newsList');

  if (isError) {
    return (
      <div className={styles['error-container']}>
        <ErrorMessage message={t('fetchError')} />
      </div>
    );
  }

  const { articles, totalResults } = news;

  if (articles.length === 0) {
    return (
      <div className={styles['placeholder-container']}>
        <p className={styles['placeholder']}>{t('placeholder')}</p>
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
