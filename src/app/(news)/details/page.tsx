import { DETAILS_KEY, PAGE_KEY, QUERY_KEY } from '@/constants/searchParamsKeys';
import { TEXT } from '@/constants/text';
import type { NewsApiResponse } from '@/app/(news)/_types';
import { ErrorMessage } from '@/components/error-message';
import CloseDetailsButton from './_components/CloseDetailsButton/CloseDetailsButton';
import Image from 'next/image';

import styles from './page.module.scss';

async function Page({ searchParams }: PageProps<'/'>) {
  const params = await searchParams;

  if (!params[DETAILS_KEY]) return null;

  const page =
    Array.isArray(params[PAGE_KEY]) || !params[PAGE_KEY]
      ? '1'
      : params[PAGE_KEY];
  const query =
    Array.isArray(params[QUERY_KEY]) || !params[QUERY_KEY]
      ? ''
      : params[QUERY_KEY];
  const details =
    Array.isArray(params[DETAILS_KEY]) || !params[DETAILS_KEY]
      ? ''
      : params[DETAILS_KEY];

  const res = await fetch(
    `${process.env.BASE_NEWS_API_URL}everything?q=${details}&searchIn=title&pageSize=1&page=1`,
    {
      cache: 'no-store',
      headers: {
        'X-Api-Key': process.env.NEWS_API_KEY ?? '',
      },
    }
  );
  const news: NewsApiResponse = await res.json();

  if (details === '')
    return (
      <div className={styles['details-container']}>
        <div className={styles['no-details']}>
          {TEXT.features.news.newsDetails.noDetails}
        </div>
      </div>
    );

  if (!res.ok)
    return (
      <div className={styles['details-container']}>
        <ErrorMessage message={TEXT.features.news.newsDetails.fetchError} />
      </div>
    );

  const article = news.articles.at(0);

  if (article === undefined)
    return (
      <div className={styles['details-container']}>
        <div className={styles['not-found']}>
          <div className={styles['details__header']}>
            <CloseDetailsButton page={page} query={query} />
          </div>
          {TEXT.features.news.newsDetails.notFound}
        </div>
      </div>
    );

  const { urlToImage, source, author, publishedAt, title, content, url } =
    article;

  const publicationDate = new Date(publishedAt);
  const publishedAtDate = publicationDate.toDateString();
  const publishedAtTime = publicationDate.toTimeString().split(' ')[0];

  return (
    <div className={styles['details-container']}>
      <div className={styles['details']}>
        <div className={styles['details__header']}>
          <CloseDetailsButton page={page} query={query} />
        </div>

        {urlToImage && (
          <div className={styles['image-container']}>
            <Image
              className={styles['image']}
              unoptimized
              fill
              src={urlToImage}
              alt={TEXT.features.news.newsDetails.imageAlt}
            />
          </div>
        )}

        {source.name && <p className={styles['source']}>{source.name}</p>}

        {author && (
          <p className={styles['author']}>
            {TEXT.features.news.newsDetails.author}
            {author}
          </p>
        )}

        <p>{`${publishedAtDate} ${publishedAtTime}`}</p>

        <p className={styles['title']}>{title}</p>

        {content && <p className={styles['content']}>{content}</p>}

        {url && (
          <div className={styles['source-container']}>
            <a href={url} target="_blank">
              {TEXT.features.news.newsDetails.source}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
