'use client';

import React, { useActionState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import {
  selectSelectedIds,
  unselectAllNews,
} from '@/app/[locale]/(news)/_store';
import { downloadNews } from '../../_api/downloadNews';
import { Button } from '@/components/button';

import styles from './news-flyout.module.scss';

const initialState: {
  error: null | string;
  csv?: string;
  fileName?: string;
} = {
  error: null,
  csv: undefined,
  fileName: undefined,
};

function NewsFlyout() {
  const t = useTranslations('features.news.newsFlyout');
  const dispatch = useDispatch();
  const selectedIds = useSelector(selectSelectedIds);
  const selectedCount = selectedIds.length;
  const [state, formAction, pending] = useActionState(
    downloadNews,
    initialState
  );

  useEffect(() => {
    if (!state.csv) return;

    const blob = new Blob([state.csv], {
      type: 'text/csv;charset=utf-8;',
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `${state.fileName}`;

    document.body.appendChild(link);
    link.click();
    link.remove();

    URL.revokeObjectURL(url);
  }, [state.csv, state.fileName]);

  function handleUnselect() {
    dispatch(unselectAllNews());
  }

  if (selectedCount === 0) return null;

  let content: React.ReactNode;

  if (state?.error) {
    content = <span className={styles['error']}>{t('error')}</span>;
  } else if (pending) {
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

      <form action={formAction} className={styles['form']}>
        <input
          type="hidden"
          value={JSON.stringify(selectedIds)}
          name="detailsList"
        />
        <Button variant="success" disabled={pending} type="submit">
          {t('download1')}
          {selectedCount}
          {t('download2')}
        </Button>
      </form>

      <Button variant="error" onClick={handleUnselect}>
        {t('unselect')}
      </Button>
    </div>
  );
}

export default NewsFlyout;
