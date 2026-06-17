'use client';

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import {
  selectSelectedIds,
  unselectAllNews,
} from '@/app/[locale]/(news)/_store';
import { convertArrayOfObjectsToCsv } from '@/utils/csv/convertArrayOfObjectsToCsv';
import { downloadCsv } from '@/utils/csv/downloadCsv';
import { Button } from '@/components/button';
import { useLazyGetNewsByDetailsListQuery } from '@/app/[locale]/(news)/_api/newsApi';

import styles from './news-flyout.module.scss';

function NewsFlyout() {
  const t = useTranslations('features.news.newsFlyout');
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
    content = <span className={styles['error']}>{t('error')}</span>;
  } else if (isLoading) {
    content = <span className={styles['loading']}>{t('downloading')}</span>;
  } else {
    content = (
      <span className={styles['flyout__selected']}>
        {t('selected')}
        {selectedCount}
      </span>
    );
  }

  return (
    <div className={styles['flyout']}>
      {content}

      <Button variant="success" onClick={handleDownload} disabled={isLoading}>
        {t('download1')}
        {selectedCount}
        {t('download2')}
      </Button>

      <Button variant="error" onClick={handleUnselect}>
        {t('unselect')}
      </Button>
    </div>
  );
}

export default NewsFlyout;
