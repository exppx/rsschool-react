'use client';

import { Fallback } from '@/components/fallback';

function GlobalError() {
  return (
    <html lang="en" data-theme="light">
      <body>
        <Fallback />
      </body>
    </html>
  );
}

export default GlobalError;
