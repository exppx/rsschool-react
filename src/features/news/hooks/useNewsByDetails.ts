import { useCallback } from 'react';
import type { Article, NewsApiResponse } from '@news/types';
import { BASE_NEWS_API_URL, NEWS_API_KEY } from '@/constants/api';
import { useQuery } from '@/utils/hooks';

export function useNewsByDetails(details: string | null) {
  const queryFn = useCallback(
    async (signal: AbortSignal) => {
      if (details === null) return null;

      const url = `${BASE_NEWS_API_URL}/everything?q=${details}&searchIn=title&pageSize=1&page=1`;

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

      return data.articles[0] ?? undefined;
    },
    [details]
  );

  const {
    isLoading,
    isError,
    data: article,
  } = useQuery<Article | null | undefined>({
    queryFn,
    initialData: null,
  });

  return { isLoading, isError, article };
}
