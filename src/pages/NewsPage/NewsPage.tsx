import { useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import type { NewsApiResponse } from '@news/types';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import { SearchNewsForm } from '@news/SearchNewsForm';
import { NewsList } from '@news/NewsList';
import { fetchNews } from '@news/api';
import { useLocalStorage } from '@/utils/hooks';

import styles from './NewsPage.module.scss';
import { PAGE_KEY } from '@/constants/searchParamsKeys';

function NewsPage() {
  const [news, setNews] = useState<NewsApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchRequest, setSearchRequest] = useLocalStorage(REQUEST_KEY, '');

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get(PAGE_KEY);

  useEffect(() => {
    async function getNews(request: string, page: string) {
      try {
        setError(null);
        setIsLoading(true);

        const news = await fetchNews(request, { page });

        setNews(news);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          throw error;
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (page) {
      getNews(searchRequest, page);
    }
  }, [searchRequest, page]);

  function handleSearch(request: string) {
    const clearRequest = request.trim();

    if (clearRequest === searchRequest) return;

    setSearchParams((searchParams) => {
      searchParams.set(PAGE_KEY, '1');
      return searchParams;
    });
    setSearchRequest(clearRequest);
  }

  return (
    <div className={styles.page}>
      <section className={styles.search}>
        <SearchNewsForm
          onSubmit={handleSearch}
          isLoading={isLoading}
          savedSearch={searchRequest}
        />
      </section>

      <section className={styles.results}>
        <NewsList news={news} isLoading={isLoading} error={error} />
        <Outlet />
      </section>
    </div>
  );
}

export default NewsPage;
