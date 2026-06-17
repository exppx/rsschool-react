import type { Metadata } from 'next';
import { hasLocale, NextIntlClientProvider } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import Providers from './providers';

import '../globals.scss';
import styles from './layout.module.scss';

export const metadata: Metadata = {
  title: 'Next.js migration',
};

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export default async function Layout({ children, params }: Props) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body>
        <Providers>
          <NextIntlClientProvider>
            <div id="root">
              <div className={styles['layout']}>
                <Header />
                <main className={styles['main']}>{children}</main>
                <Footer />
              </div>
            </div>
          </NextIntlClientProvider>
        </Providers>
      </body>
    </html>
  );
}
