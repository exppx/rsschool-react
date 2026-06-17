import type { Metadata } from 'next';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Providers from './providers';

import './globals.scss';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Next.js migration',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <div id="root">
            <div className={styles['layout']}>
              <Header />
              <main className={styles['main']}>{children}</main>
              <Footer />
            </div>
          </div>
        </Providers>
      </body>
    </html>
  );
}
