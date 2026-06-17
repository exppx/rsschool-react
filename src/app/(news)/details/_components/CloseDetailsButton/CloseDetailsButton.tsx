'use client';

import { useRouter } from 'next/navigation';
import { PAGE_KEY, QUERY_KEY } from '@/constants/searchParamsKeys';
import { Button } from '@/components/button';

import styles from './CloseDetailsButton.module.scss';

type CloseDetailsButtonProps = {
  page: string;
  query: string;
};

function CloseDetailsButton({ page, query }: CloseDetailsButtonProps) {
  const router = useRouter();

  function handleCloseDetails() {
    const queryParams = query !== '' ? `&${QUERY_KEY}=${query}` : '';

    router.replace(`/?${PAGE_KEY}=${page}${queryParams}`);
  }

  return (
    <Button
      className={styles['close-button']}
      variant="error"
      onClick={handleCloseDetails}
    >
      ✕
    </Button>
  );
}

export default CloseDetailsButton;
