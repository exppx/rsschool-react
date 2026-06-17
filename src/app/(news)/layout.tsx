import { NewsFlyout } from '@/app/(news)/_components/news-flyout';

import styles from './layout.module.scss';

function Layout({ children }: LayoutProps<'/'>) {
  return (
    <div className={styles['page']}>
      {children}
      <NewsFlyout />
    </div>
  );
}

export default Layout;
