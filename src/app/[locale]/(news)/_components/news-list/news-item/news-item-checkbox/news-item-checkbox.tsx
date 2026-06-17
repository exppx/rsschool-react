'use client';

import { useDispatch, useSelector } from 'react-redux';
import {
  selectSelectedIds,
  toggleSelectNews,
} from '@/app/[locale]/(news)/_store';

import styles from './news-item-checkbox.module.scss';

type NewsItemCheckboxProps = {
  newsId: string;
};

function NewsItemCheckbox({ newsId }: NewsItemCheckboxProps) {
  const dispatch = useDispatch();

  const selectedIds = useSelector(selectSelectedIds);
  const isSelected = selectedIds.find((id) => id === newsId) !== undefined;

  function handleToggle() {
    dispatch(toggleSelectNews(newsId));
  }

  return (
    <input
      type="checkbox"
      className={styles['checkbox']}
      checked={isSelected}
      onChange={handleToggle}
      onClick={(e) => e.stopPropagation()}
    />
  );
}

export default NewsItemCheckbox;
