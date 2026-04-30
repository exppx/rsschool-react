import React from 'react';
import type { NewsApiResponse } from '@news/types/news';
import { NewsItem } from './NewsItem';
import { NewsListSkeleton } from './NewsListSkeleton';

import styles from './NewsList.module.scss';

type NewsListProps = {
  news: NewsApiResponse | null;
  isLoading: Readonly<boolean>;
};

class NewsList extends React.Component<NewsListProps> {
  render() {
    const { news } = this.props;

    if (this.props.isLoading) {
      return <NewsListSkeleton />;
    }

    if (news?.status === 'error') {
      return <p>Error</p>;
    }

    if (news === null) {
      return <p>Placeholder</p>;
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
