import React from 'react';

import styles from './Fallback.module.scss';
import { TEXT } from '@/constants/text';

class Fallback extends React.Component {
  render() {
    return (
      <div className={styles.fallbackContainer}>
        <h1>{TEXT.ui.fallback.heading}</h1>
        <p className={styles.fallbackMessage}>{TEXT.ui.fallback.message}</p>
      </div>
    );
  }
}

export default Fallback;
