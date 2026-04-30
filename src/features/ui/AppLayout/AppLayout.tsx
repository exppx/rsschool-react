import React from 'react';
import { Header } from '@ui/Header';
import { Footer } from '@ui/Footer';

import styles from './AppLayout.module.scss';

type AppLayoutProps = {
  children?: React.ReactNode;
};

class AppLayout extends React.Component<AppLayoutProps> {
  render() {
    return (
      <div className={styles.layout}>
        <Header />
        <main className={styles.main}>{this.props.children}</main>
        <Footer />
      </div>
    );
  }
}

export default AppLayout;
