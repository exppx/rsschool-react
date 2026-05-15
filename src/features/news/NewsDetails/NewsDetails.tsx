import { useNavigate, useSearchParams } from 'react-router';
import { DETAILS_KEY } from '@/constants/searchParamsKeys';
import { TEXT } from '@/constants/text';
import { ErrorMessage } from '@ui/ErrorMessage';
import { NewsDetailsSkeleton } from './NewsDetailsSkeleton';
import { Button } from '@ui/Button';
import { useNewsByDetails } from '@news/hooks';

import styles from './NewsDetails.module.scss';

function NewsDetails() {
  const navigate = useNavigate();

  function handleCloseDetails() {
    const newParams = new URLSearchParams(searchParams);
    newParams.delete(DETAILS_KEY);

    const url = `/?${newParams.toString()}`;

    navigate(url);
  }

  const [searchParams] = useSearchParams();
  const details = searchParams.get(DETAILS_KEY);
  const { isLoading, isError, article } = useNewsByDetails(details);

  if (details === null)
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.noDetails}>
          {TEXT.features.news.newsDetails.noDetails}
        </div>
      </div>
    );

  if (isError)
    return (
      <div className={styles.detailsContainer}>
        <ErrorMessage message={TEXT.features.news.newsDetails.fetchError} />
      </div>
    );

  if (isLoading)
    return (
      <div className={styles.detailsContainer}>
        <NewsDetailsSkeleton />
      </div>
    );

  if (article === null) return;

  if (article === undefined)
    return (
      <div className={styles.detailsContainer}>
        <div className={styles.notFound}>
          <div className={styles.detailsHeader}>
            <Button
              className={styles.closeButton}
              variant="error"
              onClick={handleCloseDetails}
            >
              ✕
            </Button>
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
    <div className={styles.detailsContainer}>
      <div className={styles.details}>
        <div className={styles.detailsHeader}>
          <Button
            className={styles.closeButton}
            variant="error"
            onClick={handleCloseDetails}
          >
            ✕
          </Button>
        </div>

        {urlToImage && (
          <img
            className={styles.image}
            src={urlToImage}
            alt={TEXT.features.news.newsDetails.imageAlt}
          />
        )}

        {source.name && <p className={styles.source}>{source.name}</p>}

        {author && (
          <p className={styles.author}>
            {TEXT.features.news.newsDetails.author}
            {author}
          </p>
        )}

        <p>{`${publishedAtDate} ${publishedAtTime}`}</p>

        <p className={styles.title}>{title}</p>

        {content && <p className={styles.content}>{content}</p>}

        {url && (
          <div className={styles.sourceContainer}>
            <a href={url} target="_blank">
              {TEXT.features.news.newsDetails.source}
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

export default NewsDetails;
