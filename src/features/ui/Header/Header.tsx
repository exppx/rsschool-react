import React from 'react';
import { TEXT } from '@/constants/text';

import styles from './Header.module.scss';

class Header extends React.Component {
  render() {
    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>{TEXT.ui.header.title}</h1>
        </div>
      </header>
    );
  }
}

export default Header;
