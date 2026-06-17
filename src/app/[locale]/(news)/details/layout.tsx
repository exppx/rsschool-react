import { NewsFlyout } from '@/app/[locale]/(news)/_components/news-flyout';

import styles from './layout.module.scss';

function Layout({ children, news }: LayoutProps<'/[locale]/details'>) {
  return (
    <div className={styles['results']}>
      {news}
      {children}
      <NewsFlyout />
    </div>
  );
}

export default Layout;
