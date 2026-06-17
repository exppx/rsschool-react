'use client';

import { useCallback, useEffect } from 'react';
import { SearchNewsForm } from '@/app/(news)/_components/news-client/search-news-form';
import { useLocalStorage } from '@/utils/hooks';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import { PAGE_KEY, QUERY_KEY } from '@/constants/searchParamsKeys';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './news-client.module.scss';

function NewsClient() {
  const [searchRequest, setSearchRequest] = useLocalStorage(REQUEST_KEY, '');

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams?.get(PAGE_KEY);
  const query = searchParams?.get(QUERY_KEY);

  const setQuery = useCallback(
    (query: string) => {
      const params = new URLSearchParams(searchParams?.toString());

      params.set(QUERY_KEY, query);
      params.set(PAGE_KEY, '1');

      setSearchRequest(query);
      router.replace(`${pathname}?${params.toString()}`);
    },
    [pathname, router, searchParams, setSearchRequest]
  );

  useEffect(() => {
    function goTotPage(page: string) {
      const params = new URLSearchParams(searchParams?.toString());
      params.set(PAGE_KEY, page);
      router.replace(`${pathname}?${params.toString()}`);
    }

    if (query !== searchRequest) {
      if (!query) {
        if (searchRequest) setQuery(searchRequest);
      } else {
        setSearchRequest(query);
      }
    }

    if (!page) {
      goTotPage('1');
    }
  }, [
    page,
    pathname,
    router,
    searchParams,
    query,
    searchRequest,
    setSearchRequest,
    setQuery,
  ]);

  function handleSearch(request: string) {
    const clearRequest = request.trim();

    if (clearRequest === searchRequest) return;

    setQuery(clearRequest);
  }

  return (
    <section className={styles['search']}>
      <SearchNewsForm onSubmit={handleSearch} savedSearch={searchRequest} />
    </section>
  );
}

export default NewsClient;
