import React from 'react';
import { TEXT } from '@/constants/text';
import { Button } from '@ui/Button';
import { BuggyComponent } from '@ui/BuggyComponent';

import styles from './Header.module.scss';

class Header extends React.Component {
  state = {
    isError: false,
  };

  render() {
    return (
      <header className={styles.header}>
        <div className={styles.wrapper}>
          <h1 className={styles.heading}>{TEXT.ui.header.title}</h1>
        </div>

        <Button
          variant="error"
          className={styles.errorButton}
          onClick={() => {
            this.setState({ isError: true });
          }}
        >
          {TEXT.ui.header.errorButton}
        </Button>

        {this.state.isError && <BuggyComponent shouldThrow />}
      </header>
    );
  }
}

export default Header;
