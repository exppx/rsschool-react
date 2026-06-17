import type { NewsApiResponse } from '../_types';

export default async function getNewsByDetails(details: string) {
  const res = await fetch(
    `${process.env.BASE_NEWS_API_URL}everything?q=${details}&searchIn=title&pageSize=1&page=1`,
    {
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY ?? '',
      },
      next: {
        tags: ['news', `news:${details}`],
      },
    }
  );

  return { data: (await res.json()) as NewsApiResponse, isError: !res.ok };
}
