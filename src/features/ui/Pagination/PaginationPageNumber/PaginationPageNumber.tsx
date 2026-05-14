import { useSearchParams } from 'react-router';

import styles from './PaginationPageNumber.module.scss';

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
  const [, setSearchParams] = useSearchParams();

  function handlePageNavigation() {
    if (page === currentPage) return;

    setSearchParams((searchParams) => {
      searchParams.set(queryKey, page.toString());
      return searchParams;
    });
  }

  return (
    <div
      onClick={handlePageNavigation}
      className={`${styles.paginationNumber} ${page === currentPage ? styles.paginationNumberActive : styles.paginationNumberInactive}`}
    >
      {page}
    </div>
  );
}

export default PaginationPageNumber;
