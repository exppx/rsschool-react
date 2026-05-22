import { BASE_NEWS_API_URL, NEWS_API_KEY } from '@/constants/api';
import type { Article, NewsApiResponse } from '@news/types';

export async function fetchNewsByDetails(
  details: string
): Promise<Article | undefined> {
  const url = `${BASE_NEWS_API_URL}/everything?q=${details}&searchIn=title&pageSize=1&page=1`;

  const response = await fetch(url, {
    method: 'GET',
    headers: { 'X-Api-Key': NEWS_API_KEY },
  });

  if (!response.ok) {
    const responseStatusGroup = Math.round(response.status / 100);

    if (responseStatusGroup === 4 || responseStatusGroup === 5) {
      throw new Error(`${response.status}`);
    }
  }

  const data: NewsApiResponse = await response.json();

  return data.articles[0] ?? undefined;
}
