import React from 'react';
import type { NewsApiResponse } from '@news/types';
import { TEXT } from '@/constants/text';
import { NewsItem } from './NewsItem';
import { NewsListSkeleton } from './NewsListSkeleton';
import { ErrorMessage } from '@ui/ErrorMessage';

import styles from './NewsList.module.scss';

type NewsListProps = {
  news: NewsApiResponse | null;
  isLoading: Readonly<boolean>;
  error: Readonly<string | null>;
};

class NewsList extends React.Component<NewsListProps> {
  render() {
    const { news, error, isLoading } = this.props;

    if (error !== null) {
      return (
        <div className={styles.errorContainer}>
          <ErrorMessage message={TEXT.features.news.newsList.fetchError} />
        </div>
      );
    }

    if (isLoading) {
      return <NewsListSkeleton />;
    }

    if (news === null) {
      return;
    }

    if (news.articles.length === 0) {
      return (
        <div className={styles.placeholderContainer}>
          <p className={styles.placeholder}>
            {TEXT.features.news.newsList.placeholder}
          </p>
        </div>
      );
    }

    return (
      <ul className={styles.newsList}>
        {news.articles.map((article) => (
          <li key={article.title} className={styles.newsItem}>
            <NewsItem article={article} />
          </li>
        ))}
      </ul>
    );
  }
}

export default NewsList;
