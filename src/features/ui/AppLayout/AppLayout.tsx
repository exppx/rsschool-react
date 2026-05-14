import { Header } from '@ui/Header';
import { Footer } from '@ui/Footer';

import styles from './AppLayout.module.scss';
import { Outlet } from 'react-router';

function AppLayout() {
  return (
    <div className={styles.layout}>
      <Header />

      <main className={styles.main}>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default AppLayout;
