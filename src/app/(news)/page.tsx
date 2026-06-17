import { PAGE_KEY, QUERY_KEY } from '@/constants/searchParamsKeys';
import NewsClient from './_components/news-client/news-client';
import { NewsList } from '@/app/(news)/_components/news-list';
import type { NewsApiResponse } from '@/app/(news)/_types';

import styles from './page.module.scss';

async function Page({ searchParams }: PageProps<'/'>) {
  const params = await searchParams;
  const pageRaw = params[PAGE_KEY];
  const page = Array.isArray(pageRaw) || !pageRaw ? '1' : pageRaw;

  const queryRaw = params[QUERY_KEY];
  const query = Array.isArray(queryRaw) || !queryRaw ? '' : queryRaw;

  let url = `top-headlines?country=us&pageSize=10&page=${page}`;

  if (query !== '') {
    url = `everything?q=${query}&searchIn=title&pageSize=10&page=${page}`;
  }

  const res = await fetch(`${process.env.BASE_NEWS_API_URL}${url}`, {
    cache: 'no-store',
    headers: {
      'X-Api-Key': process.env.NEWS_API_KEY ?? '',
    },
  });
  const news: NewsApiResponse = await res.json();

  return (
    <div className={styles['page']}>
      <NewsClient />
      <section className={styles['results']}>
        <NewsList news={news} isError={!res.ok} page={page} query={query} />
      </section>
    </div>
  );
}

export default Page;
