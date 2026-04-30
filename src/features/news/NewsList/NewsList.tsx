import React from 'react';
import type { NewsApiResponse } from '@news/types/news';

import styles from './NewsList.module.scss';
import { NewsItem } from './NewsItem';

type NewsListProps = {
  news: NewsApiResponse | null;
};

class NewsList extends React.Component<NewsListProps> {
  render() {
    const { news } = this.props;

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
