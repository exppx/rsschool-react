import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { MAX_INPUT_LENGTH } from '@/constants/numbers';
import { Button } from '@/components/button';
import { Input } from '@/components/input';

import searchIcon from '@/assets/search.svg';
import styles from './search-news-form.module.scss';

type SearchNewsFormProps = {
  onSubmit: (search: string) => void;
  savedSearch: string;
};

function SearchNewsForm({ onSubmit, savedSearch }: SearchNewsFormProps) {
  const [request, setRequest] = useState(savedSearch);
  const t = useTranslations('features.news');

  useEffect(() => {
    // eslint-disable-next-line
    setRequest(savedSearch);
  }, [savedSearch]);

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    onSubmit(request);
  }

  return (
    <form className={styles['form']} onSubmit={handleSubmit}>
      <Input
        name="search"
        placeholder={t('searchPlaceholder')}
        maxLength={MAX_INPUT_LENGTH}
        value={request}
        onChange={(e) => setRequest(e.target.value)}
        aria-label="search input"
      />

      <Button type="submit" aria-label="search button">
        <Image width={20} height={20} src={searchIcon.src} alt="search-icon" />
      </Button>
    </form>
  );
}

export default SearchNewsForm;
