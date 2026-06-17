'use client';

import { useSearchParams } from 'next/navigation';
import { usePathname, useRouter } from '@/i18n/navigation';
import { API_MAX_PAGE_COUNT } from '@/constants/numbers';
import { Button } from '@/components/button';
import { PaginationPageNumber } from './pagination-page-number';

import styles from './pagination.module.scss';

type PaginationProps = {
  totalItems: number;
  pageSize: number;
  queryKey: string;
};

function Pagination({ totalItems, pageSize, queryKey }: PaginationProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const currentPage = searchParams?.get(queryKey);
  const currentPageNumber = currentPage ? Number.parseInt(currentPage) : null;
  const isPageNumberValid =
    !!currentPageNumber &&
    !Number.isNaN(currentPageNumber) &&
    currentPageNumber > 0;

  if (!isPageNumberValid) return;

  const lastPageNumber = pageSize
    ? Math.min(Math.ceil(totalItems / pageSize), API_MAX_PAGE_COUNT)
    : 1;

  const goNext = () => {
    if (currentPageNumber >= lastPageNumber) return;

    const params = new URLSearchParams(searchParams?.toString());
    params.set(queryKey, `${currentPageNumber + 1}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  const goBack = () => {
    if (currentPageNumber <= 1) return;

    const params = new URLSearchParams(searchParams?.toString());
    params.set(queryKey, `${currentPageNumber - 1}`);
    router.replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className={styles['pagination']}>
      <Button onClick={goBack} disabled={currentPageNumber < 2}>
        ◀
      </Button>

      <div className={styles['pages']}>
        {currentPageNumber > 2 && (
          <>
            <PaginationPageNumber
              page={1}
              queryKey={queryKey}
              currentPage={currentPageNumber}
            />
            {currentPageNumber > 3 && (
              <span className={styles['ellipsis']}>...</span>
            )}
          </>
        )}

        <>
          {currentPageNumber > 1 && (
            <PaginationPageNumber
              page={currentPageNumber - 1}
              queryKey={queryKey}
              currentPage={currentPageNumber}
            />
          )}
          <PaginationPageNumber
            page={currentPageNumber}
            queryKey={queryKey}
            currentPage={currentPageNumber}
          />
          {currentPageNumber < lastPageNumber && (
            <PaginationPageNumber
              page={currentPageNumber + 1}
              queryKey={queryKey}
              currentPage={currentPageNumber}
            />
          )}
        </>

        {currentPageNumber < lastPageNumber - 1 && (
          <>
            {currentPageNumber < lastPageNumber - 2 && (
              <span className={styles['ellipsis']}>...</span>
            )}
            <PaginationPageNumber
              page={lastPageNumber}
              queryKey={queryKey}
              currentPage={currentPageNumber}
            />
          </>
        )}
      </div>

      <Button onClick={goNext} disabled={currentPageNumber === lastPageNumber}>
        ▶
      </Button>
    </div>
  );
}

export default Pagination;
