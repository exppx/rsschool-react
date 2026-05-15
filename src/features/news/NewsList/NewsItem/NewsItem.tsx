import type { Article } from '@news/types';
import { TEXT } from '@/constants/text';
import { useNavigate, useSearchParams } from 'react-router';

import styles from './NewsItem.module.scss';
import { DETAILS_KEY } from '@/constants/searchParamsKeys';

type NewsItemProps = {
  article: Article;
};

function NewsItem({ article }: NewsItemProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  function handleOpenDetails() {
    searchParams.set(DETAILS_KEY, encodeURIComponent(article.title));
    const url = `details/?${searchParams.toString()}`;
    navigate(url);
  }

  const publishedAt = new Date(article.publishedAt);
  const publishingDate = publishedAt.toDateString();
  const publishingTime = publishedAt.toTimeString().split(' ')[0];

  return (
    <article className={styles.article} onClick={handleOpenDetails}>
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
