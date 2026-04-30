import React from 'react';
import type { Article } from '@news/types';

import styles from './NewsItem.module.scss';

type NewsItemProps = {
  article: Article;
};

class NewsItem extends React.Component<NewsItemProps> {
  render() {
    const { article } = this.props;
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
              View source
            </a>
          </div>
        )}
      </article>
    );
  }
}

export default NewsItem;
