import React from 'react';
import type { NewsApiResponse } from '@news/types/news';
import { SearchNewsForm } from '@news/SearchNewsForm';

import styles from './NewsPage.module.scss';
import { NewsList } from '@news/NewsList';

type NewsPageState = {
  news: NewsApiResponse | null;
  isLoading: boolean;
};

class NewsPage extends React.Component {
  state: NewsPageState = {
    news: null,
    isLoading: false,
  };

  render() {
    return (
      <div className={styles.page}>
        <section className={styles.search}>
          <SearchNewsForm
            onNewsReceived={(news: NewsApiResponse) => this.setState({ news })}
            setIsLoading={(isLoading: boolean) => this.setState({ isLoading })}
            isLoading={this.state.isLoading}
          />
        </section>

        <section className={styles.results}>
          <NewsList news={this.state.news} isLoading={this.state.isLoading} />
        </section>
      </div>
    );
  }
}

export default NewsPage;
