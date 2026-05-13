import type { Article, NewsApiResponse } from '@news/types';

const NEWS_API_KEY = '1a1feefeb03f471893eb9f607d412570';
const BASE_API_URL = 'https://newsapi.org/v2';

export default async function fetchNews(query: string): Promise<Article[]> {
  let url = `${BASE_API_URL}/top-headlines?country=us&pageSize=10&page=1`;

  if (query !== '') {
    url = `${BASE_API_URL}/everything?q=${query}&searchIn=title&pageSize=10&page=1`;
  }

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

  return data.articles;
}
