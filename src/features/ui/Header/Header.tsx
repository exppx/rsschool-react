import { useState } from 'react';
import { TEXT } from '@/constants/text';
import { Button } from '@ui/Button';
import { BuggyComponent } from '@ui/BuggyComponent';

import styles from './Header.module.scss';

function Header() {
  const [isError, setIsError] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <h1 className={styles.heading}>{TEXT.ui.header.title}</h1>
      </div>

      <Button
        variant="error"
        className={styles.errorButton}
        onClick={() => {
          setIsError(true);
        }}
      >
        {TEXT.ui.header.errorButton}
      </Button>

      {isError && <BuggyComponent shouldThrow />}
    </header>
  );
}

export default Header;
