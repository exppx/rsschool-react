import { NewsFlyout } from '@/app/[locale]/(news)/_components/news-flyout';

import styles from './layout.module.scss';

function Layout({ children }: LayoutProps<'/[locale]'>) {
  return (
    <div className={styles['page']}>
      {children}
      <NewsFlyout />
    </div>
  );
}

export default Layout;
