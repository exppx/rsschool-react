import { TEXT } from '@/constants/text';

import '@/app/globals.scss';
import styles from './fallback.module.scss';

function Fallback() {
  return (
    <div className={styles['fallback-container']}>
      <h1>{TEXT.ui.fallback.heading}</h1>
      <p className={styles['fallback__message']}>{TEXT.ui.fallback.message}</p>
    </div>
  );
}

export default Fallback;
