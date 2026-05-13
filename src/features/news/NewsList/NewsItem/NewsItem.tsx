import type { Article } from '@news/types';

import styles from './NewsItem.module.scss';
import { TEXT } from '@/constants/text';

type NewsItemProps = {
  article: Article;
};

function NewsItem({ article }: NewsItemProps) {
  const publishedAt = new Date(article.publishedAt);
  const publishingDate = publishedAt.toDateString();
  const publishingTime = publishedAt.toTimeString().split(' ')[0];

  return (
    <article className={styles.article}>
      <time>{`${publishingDate} ${publishingTime}`}</time>
      <h2>{article.title}</h2>
      <p className={styles.description}>{article.description}</p>
      {article.url && (
        <div>
          <a href={article.url} target="_blank">
            {TEXT.features.news.newsList.newsItem.viewSource}
          </a>
        </div>
      )}
    </article>
  );
}

export default NewsItem;
