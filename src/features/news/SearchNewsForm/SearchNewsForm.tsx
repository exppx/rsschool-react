import React, { useState } from 'react';
import { MAX_INPUT_LENGTH } from '@/constants/numbers';
import { TEXT } from '@/constants/text';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

import searchIcon from '@/assets/search.svg';
import styles from './SearchNewsForm.module.scss';

type SearchNewsFormProps = {
  onSubmit: (search: string) => void;
  isLoading: boolean;
  savedSearch: string;
};

function SearchNewsForm({
  onSubmit,
  isLoading,
  savedSearch,
}: SearchNewsFormProps) {
  const [request, setRequest] = useState(savedSearch);

  function handleSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    onSubmit(request);
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <Input
        name="search"
        placeholder={TEXT.features.news.searchPlaceholder}
        maxLength={MAX_INPUT_LENGTH}
        disabled={isLoading}
        value={request}
        onChange={(e) => setRequest(e.target.value)}
      />

      <Button type="submit" disabled={isLoading}>
        <img className={styles.buttonIcon} src={searchIcon} />
      </Button>
    </form>
  );
}

export default SearchNewsForm;
