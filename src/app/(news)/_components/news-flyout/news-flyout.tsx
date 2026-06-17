'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectSelectedIds, unselectAllNews } from '@/app/(news)/_store';
import { TEXT } from '@/constants/text';
import { convertArrayOfObjectsToCsv } from '@/utils/csv/convertArrayOfObjectsToCsv';
import { downloadCsv } from '@/utils/csv/downloadCsv';
import { Button } from '@/components/button';
import { useLazyGetNewsByDetailsListQuery } from '@/app/(news)/_api/newsApi';

import styles from './news-flyout.module.scss';

function NewsFlyout() {
  const [getNewsByDetailsList, { isLoading, isError }] =
    useLazyGetNewsByDetailsListQuery();

  const dispatch = useDispatch();
  const selectedIds = useSelector(selectSelectedIds);
  const selectedCount = selectedIds.length;

  if (selectedCount === 0) return null;

  async function handleDownload() {
    const result = await getNewsByDetailsList(selectedIds, true);

    if (!result.data) return;

    const csv = convertArrayOfObjectsToCsv(result.data);

    downloadCsv(csv, `${selectedCount}_news.csv`);
  }

  function handleUnselect() {
    dispatch(unselectAllNews());
  }

  let content: React.ReactNode;

  if (isError) {
    content = (
      <span className={styles['error']}>
        {TEXT.features.news.newsFlyout.error}
      </span>
    );
  } else if (isLoading) {
    content = (
      <span className={styles['loading']}>
        {TEXT.features.news.newsFlyout.downloading}
      </span>
    );
  } else {
    content = (
      <span className={styles['flyout__selected']}>
        {TEXT.features.news.newsFlyout.selected}
        {selectedCount}
      </span>
    );
  }

  return (
    <div className={styles['flyout']}>
      {content}

      <Button variant="success" onClick={handleDownload} disabled={isLoading}>
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
