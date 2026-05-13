import { useEffect, useState } from 'react';
import type { Article } from '@news/types';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import { SearchNewsForm } from '@news/SearchNewsForm';
import { NewsList } from '@news/NewsList';
import { fetchNews } from '@/features/news';

import styles from './NewsPage.module.scss';

function NewsPage() {
  const [news, setNews] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [searchRequest, setSearchRequest] = useState(
    () => localStorage.getItem(REQUEST_KEY) ?? ''
  );

  useEffect(() => {
    async function getNews(request: string) {
      try {
        setError(null);
        setIsLoading(true);

        const news = await fetchNews(request);

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

    getNews(searchRequest);
  }, [searchRequest]);

  function handleSearch(request: string) {
    const clearRequest = request.trim();
    const previousRequest = localStorage.getItem(REQUEST_KEY) ?? '';

    if (clearRequest === previousRequest) return;

    localStorage.setItem(REQUEST_KEY, clearRequest);
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
      </section>
    </div>
  );
}

export default NewsPage;
