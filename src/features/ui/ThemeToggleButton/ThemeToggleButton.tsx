import { useTheme } from '@/contexts/theme';

import styles from './ThemeToggleButton.module.scss';
import moon from '@/assets/moon.svg';
import sun from '@/assets/sun.svg';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles.themeToggler}>
      <img
        src={theme === 'light' ? moon : sun}
        className={styles.themeTogglerIcon}
      />
    </button>
  );
}

export default ThemeToggleButton;
