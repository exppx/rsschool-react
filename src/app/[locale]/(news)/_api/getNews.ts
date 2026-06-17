'use server';

import type { NewsApiResponse } from '../_types';

export default async function getNews({
  page,
  query,
}: {
  page: string;
  query: string;
}) {
  let url = `top-headlines?country=us&pageSize=10&page=${page}`;

  if (query !== '') {
    url = `everything?q=${query}&searchIn=title&pageSize=10&page=${page}`;
  }

  const res = await fetch(`${process.env.BASE_NEWS_API_URL}${url}`, {
    headers: {
      'X-Api-Key': process.env.NEWS_API_KEY ?? '',
    },
    next: {
      tags: ['news', `news:${page}:${query}`],
    },
  });

  return { data: (await res.json()) as NewsApiResponse, isError: !res.ok };
}
