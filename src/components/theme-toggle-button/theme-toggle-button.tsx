import Image from 'next/image';
import { useTheme } from '@/contexts/theme';

import styles from './theme-toggle-button.module.scss';
import moon from '@/assets/moon.svg';
import sun from '@/assets/sun.svg';

function ThemeToggleButton() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className={styles['theme-toggler']}>
      <Image
        src={theme === 'light' ? moon.src : sun.src}
        width={24}
        height={24}
        alt="theme"
      />
    </button>
  );
}

export default ThemeToggleButton;
