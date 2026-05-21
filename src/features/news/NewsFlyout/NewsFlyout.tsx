import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedIds, unselectAllNews } from '@news/store';
import { TEXT } from '@/constants/text';
import { fetchNewsByDetails } from '@news/api/fetchNewsByDetails';
import { convertArrayOfObjectsToCsv } from '@/utils/csv/convertArrayOfObjectsToCsv';
import { downloadCsv } from '@/utils/csv/downloadCsv';
import { Button } from '@ui/Button';

import styles from './NewsFlyout.module.scss';

function NewsFlyout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const timeoutRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    return () => {
      clearTimeout(timeoutRef.current);
    };
  }, []);

  const dispatch = useDispatch();
  const selectedIds = useSelector(selectSelectedIds);
  const selectedCount = selectedIds.length;

  if (selectedCount === 0) return null;

  async function handleDownload() {
    try {
      setIsLoading(true);

      const data = await Promise.all(
        selectedIds.map((id) => fetchNewsByDetails(id))
      );

      const validData = data.filter((article) => article !== undefined);
      const csv = convertArrayOfObjectsToCsv(validData);

      downloadCsv(csv, `${selectedCount}_news.csv`);
    } catch {
      setIsError(true);
      timeoutRef.current = setTimeout(() => setIsError(false), 3000);
    } finally {
      setIsLoading(false);
    }
  }

  function handleUnselect() {
    dispatch(unselectAllNews());
  }

  let content: React.ReactNode;

  if (isError) {
    content = (
      <span className={styles.error}>
        {TEXT.features.news.newsFlyout.error}
      </span>
    );
  } else if (isLoading) {
    content = (
      <span className={styles.loading}>
        {TEXT.features.news.newsFlyout.downloading}
      </span>
    );
  } else {
    content = (
      <span className={styles.flyoutSelected}>
        {TEXT.features.news.newsFlyout.selected}
        {selectedCount}
      </span>
    );
  }

  return (
    <div className={styles.flyout}>
      {content}

      <Button
        variant="success"
        onClick={handleDownload}
        disabled={isLoading || isError}
      >
        {TEXT.features.news.newsFlyout.download1}
        {selectedCount}
        {TEXT.features.news.newsFlyout.download2}
      </Button>

      <Button variant="error" onClick={handleUnselect}>
        {TEXT.features.news.newsFlyout.unselect}
      </Button>
    </div>
  );
}

export default NewsFlyout;
