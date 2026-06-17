'use client';

import { routing } from '@/i18n/routing';
import { NextIntlClientProvider } from 'next-intl';
import { Fallback } from '@/components/fallback';

import ruMessages from '@/../messages/ru.json';
import enMessages from '@/../messages/en.json';

const messagesMap = {
  ru: ruMessages,
  en: enMessages,
};

function GlobalError() {
  const pathname =
    typeof window !== 'undefined' ? window.location.pathname : '';
  const locale =
    routing.locales.find((loc) => pathname.startsWith(`/${loc}`)) ||
    routing.defaultLocale;
  const messages = messagesMap[locale];

  return (
    <html lang={locale} data-theme="light">
      <body>
        <NextIntlClientProvider locale={locale} messages={messages}>
          <Fallback />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

export default GlobalError;
