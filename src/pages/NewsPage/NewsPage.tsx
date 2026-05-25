import { useEffect } from 'react';
import { Outlet, useSearchParams } from 'react-router';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import { PAGE_KEY } from '@/constants/searchParamsKeys';
import { SearchNewsForm } from '@news/SearchNewsForm';
import { NewsList } from '@news/NewsList';
import { useLocalStorage } from '@/utils/hooks';
import { NewsFlyout } from '@/features/news/NewsFlyout';
import { useGetNewsQuery } from '@/features/news/api/newsApi';

import styles from './NewsPage.module.scss';
import { skipToken } from '@reduxjs/toolkit/query';

function NewsPage() {
  const [searchRequest, setSearchRequest] = useLocalStorage(REQUEST_KEY, '');

  const [searchParams, setSearchParams] = useSearchParams();
  const page = searchParams.get(PAGE_KEY);

  useEffect(() => {
    if (!page) {
      setSearchParams((searchParams) => {
        searchParams.set(PAGE_KEY, '1');
        return searchParams;
      });
    }
  }, [setSearchParams, page]);

  const {
    isFetching,
    isError,
    data: news,
  } = useGetNewsQuery(page ? { query: searchRequest, page } : skipToken);

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
          isLoading={isFetching}
          savedSearch={searchRequest}
        />
      </section>

      <section className={styles.results}>
        <NewsList news={news} isLoading={isFetching} isError={isError} />
        <Outlet />
      </section>

      <NewsFlyout />
    </div>
  );
}

export default NewsPage;
