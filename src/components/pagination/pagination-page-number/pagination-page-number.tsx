'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

import styles from './pagination-page-number.module.scss';

type PaginationPageNumberProps = {
  currentPage: number;
  page: number;
  queryKey: string;
};

function PaginationPageNumber({
  page,
  queryKey,
  currentPage,
}: PaginationPageNumberProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handlePageNavigation() {
    if (page === currentPage) return;

    const params = new URLSearchParams(searchParams?.toString());
    params.set(queryKey, `${page}`);
    router.replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div
      onClick={handlePageNavigation}
      className={`${styles['pagination-number']} ${page === currentPage ? styles['pagination-number_active'] : styles['pagination-number_inactive']}`}
    >
      {page}
    </div>
  );
}

export default PaginationPageNumber;
