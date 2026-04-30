import React from 'react';
import type { NewsApiResponse } from '@news/types';
import { SearchNewsForm } from '@news/SearchNewsForm';

import styles from './NewsPage.module.scss';
import { NewsList } from '@news/NewsList';

type NewsPageState = {
  news: NewsApiResponse | null;
  isLoading: boolean;
  error: string | null;
};

class NewsPage extends React.Component {
  state: NewsPageState = {
    news: null,
    isLoading: false,
    error: null,
  };

  render() {
    return (
      <div className={styles.page}>
        <section className={styles.search}>
          <SearchNewsForm
            onNewsReceived={(news: NewsApiResponse) => this.setState({ news })}
            setIsLoading={(isLoading: boolean) => this.setState({ isLoading })}
            isLoading={this.state.isLoading}
            setError={(error: string | null) => this.setState({ error })}
          />
        </section>

        <section className={styles.results}>
          <NewsList
            news={this.state.news}
            isLoading={this.state.isLoading}
            error={this.state.error}
          />
        </section>
      </div>
    );
  }
}

export default NewsPage;
