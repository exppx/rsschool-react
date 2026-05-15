import { useState } from 'react';
import { NavLink } from 'react-router';
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

        <nav className={styles.nav}>
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            {TEXT.ui.header.home}
          </NavLink>
          <NavLink
            to="/about"
            className={({ isActive }) =>
              isActive
                ? `${styles.navLink} ${styles.navLinkActive}`
                : styles.navLink
            }
          >
            {TEXT.ui.header.about}
          </NavLink>

          <Button
            variant="error"
            className={styles.errorButton}
            onClick={() => {
              setIsError(true);
            }}
          >
            {TEXT.ui.header.errorButton}
          </Button>
        </nav>
      </div>

      {isError && <BuggyComponent shouldThrow />}
    </header>
  );
}

export default Header;
