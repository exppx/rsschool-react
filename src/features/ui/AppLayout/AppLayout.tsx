import React from 'react';
import { Header } from '@ui/Header';
import { Footer } from '@ui/Footer';

import styles from './AppLayout.module.scss';

type AppLayoutProps = {
  children?: React.ReactNode;
};

function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className={styles.layout}>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default AppLayout;
