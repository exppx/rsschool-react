import { useNavigate, useSearchParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import type { Article } from '@news/types';
import { TEXT } from '@/constants/text';
import { DETAILS_KEY } from '@/constants/searchParamsKeys';
import { selectSelectedIds, toggleSelectNews } from '@news/store';

import styles from './NewsItem.module.scss';

type NewsItemProps = {
  article: Article;
};

function NewsItem({ article }: NewsItemProps) {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const encodedTitle = encodeURIComponent(article.title);

  const dispatch = useDispatch();
  const selectedIds = useSelector(selectSelectedIds);
  const isSelected =
    selectedIds.find((id) => id === encodedTitle) !== undefined;

  function handleOpenDetails() {
    searchParams.set(DETAILS_KEY, encodedTitle);
    const url = `details/?${searchParams.toString()}`;
    navigate(url);
  }

  function handleToggle() {
    dispatch(toggleSelectNews(encodedTitle));
  }

  const publishedAt = new Date(article.publishedAt);
  const publishingDate = publishedAt.toDateString();
  const publishingTime = publishedAt.toTimeString().split(' ')[0];

  return (
    <article className={styles.article} onClick={handleOpenDetails}>
      <div className={styles.descriptionContainer}>
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
      </div>

      <div className={styles.checkboxContainer}>
        <input
          type="checkbox"
          className={styles.checkbox}
          checked={isSelected}
          onChange={handleToggle}
          onClick={(e) => e.stopPropagation()}
        />
      </div>
    </article>
  );
}

export default NewsItem;
