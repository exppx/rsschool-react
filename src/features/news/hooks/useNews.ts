import { useCallback } from 'react';
import type { NewsApiResponse } from '@news/types';
import { BASE_NEWS_API_URL, NEWS_API_KEY } from '@/constants/api';
import { useQuery } from '@/utils/hooks';

export function useNews(query: string, options: { page: string | null }) {
  const queryFn = useCallback(
    async (signal: AbortSignal) => {
      if (options.page === null) return null;

      let url = `${BASE_NEWS_API_URL}/top-headlines?country=us&pageSize=10&page=${options.page}`;

      if (query !== '') {
        url = `${BASE_NEWS_API_URL}/everything?q=${query}&searchIn=title&pageSize=10&page=${options.page}`;
      }

      const response = await fetch(url, {
        method: 'GET',
        headers: { 'X-Api-Key': NEWS_API_KEY },
        signal,
      });

      if (!response.ok) {
        const responseStatusGroup = Math.round(response.status / 100);

        if (responseStatusGroup === 4 || responseStatusGroup === 5) {
          throw new Error(`${response.status}`);
        }
      }

      const data: NewsApiResponse = await response.json();

      return data;
    },
    [options.page, query]
  );

  const {
    isLoading,
    isError,
    data: news,
  } = useQuery<NewsApiResponse | null>({
    queryFn,
    initialData: null,
  });

  return { isLoading, isError, news };
}
