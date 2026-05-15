import { TEXT } from '@/constants/text';

import styles from './Fallback.module.scss';

function Fallback() {
  return (
    <div className={styles.fallbackContainer}>
      <h1>{TEXT.ui.fallback.heading}</h1>
      <p className={styles.fallbackMessage}>{TEXT.ui.fallback.message}</p>
    </div>
  );
}

export default Fallback;
