import React from 'react';
import type { NewsApiResponse } from '@/features/news/types/news';
import { SearchNewsForm } from '@/features/news/SearchNewsForm';

import styles from './NewsPage.module.scss';
import { NewsList } from '@/features/news/NewsList';

type NewsPageState = {
  news: NewsApiResponse | null;
};

class NewsPage extends React.Component {
  state: NewsPageState = {
    news: null,
  };

  render() {
    return (
      <div className={styles.page}>
        <section className={styles.search}>
          <SearchNewsForm
            onNewsReceived={(news: NewsApiResponse) => this.setState({ news })}
          />
        </section>

        <section className={styles.results}>
          <NewsList news={this.state.news} />
        </section>
      </div>
    );
  }
}

export default NewsPage;
