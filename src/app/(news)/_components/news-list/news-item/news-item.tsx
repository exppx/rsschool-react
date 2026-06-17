import Link from 'next/link';
import type { Article } from '@/app/(news)/_types';
import { NewsItemCheckbox } from './news-item-checkbox';

import styles from './news-item.module.scss';

type NewsItemProps = {
  article: Article;
  page: string;
  query: string;
};

function NewsItem({ article, page, query }: NewsItemProps) {
  const encodedTitle = encodeURIComponent(article.title);

  const publishedAt = new Date(article.publishedAt);
  const publishingDate = publishedAt.toDateString();
  const publishingTime = publishedAt.toTimeString().split(' ')[0];

  return (
    <article className={styles['article']}>
      <Link
        href={`/details?details=${encodedTitle}&page=${page}${query !== '' ? `&q=${query}` : ''}`}
        prefetch={false}
        className={styles['link']}
      >
        <div className={styles['description-container']}>
          <time>{`${publishingDate} ${publishingTime}`}</time>
          <h2>{article.title}</h2>
          <p className={styles['description']}>{article.description}</p>
        </div>
      </Link>

      <div className={styles['checkbox-container']}>
        <NewsItemCheckbox newsId={encodedTitle} />
      </div>
    </article>
  );
}

export default NewsItem;
