import React from 'react';
import { SearchNewsForm } from '@/features/news/SearchNewsForm';

import styles from './NewsPage.module.scss';

class NewsPage extends React.Component {
  render() {
    return (
      <>
        <section className={styles.search}>
          <SearchNewsForm />
        </section>

        <section className={styles.results}></section>
      </>
    );
  }
}

export default NewsPage;
