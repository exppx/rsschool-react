import { getTranslations } from 'next-intl/server';
import { DETAILS_KEY, PAGE_KEY, QUERY_KEY } from '@/constants/searchParamsKeys';
import type { NewsApiResponse } from '@/app/[locale]/(news)/_types';
import { ErrorMessage } from '@/components/error-message';
import CloseDetailsButton from './_components/CloseDetailsButton/CloseDetailsButton';
import Image from 'next/image';

import styles from './page.module.scss';

async function Page({ searchParams }: PageProps<'/[locale]'>) {
  const params = await searchParams;
  const t = await getTranslations('features.news.newsDetails');

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
        <div className={styles['no-details']}>{t('noDetails')}</div>
      </div>
    );

  if (!res.ok)
    return (
      <div className={styles['details-container']}>
        <ErrorMessage message={t('fetchError')} />
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
          {t('notFound')}
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
              alt={t('imageAlt')}
            />
          </div>
        )}

        {source.name && <p className={styles['source']}>{source.name}</p>}

        {author && (
          <p className={styles['author']}>
            {t('author')}
            {author}
          </p>
        )}

        <p>{`${publishedAtDate} ${publishedAtTime}`}</p>

        <p className={styles['title']}>{title}</p>

        {content && <p className={styles['content']}>{content}</p>}

        {url && (
          <div className={styles['source-container']}>
            <a href={url} target="_blank">
              {t('source')}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default Page;
