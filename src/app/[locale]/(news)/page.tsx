import { PAGE_KEY, QUERY_KEY } from '@/constants/searchParamsKeys';
import NewsClient from './_components/news-client/news-client';
import { NewsList } from '@/app/[locale]/(news)/_components/news-list';
import getNews from './_api/getNews';

import styles from './page.module.scss';

async function Page({ searchParams }: PageProps<'/[locale]'>) {
  const params = await searchParams;
  const pageRaw = params[PAGE_KEY];
  const page = Array.isArray(pageRaw) || !pageRaw ? '1' : pageRaw;

  const queryRaw = params[QUERY_KEY];
  const query = Array.isArray(queryRaw) || !queryRaw ? '' : queryRaw;

  const response = await getNews({ page, query });

  return (
    <div className={styles['page']}>
      <NewsClient />
      <section className={styles['results']}>
        <NewsList
          news={response.data}
          isError={response.isError}
          page={page}
          query={query}
        />
      </section>
    </div>
  );
}

export default Page;
