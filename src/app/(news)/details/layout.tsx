import { NewsFlyout } from '@/app/(news)/_components/news-flyout';

import styles from './layout.module.scss';

function Layout({ children, news }: LayoutProps<'/details'>) {
  return (
    <div className={styles['results']}>
      {news}
      {children}
      <NewsFlyout />
    </div>
  );
}

export default Layout;
