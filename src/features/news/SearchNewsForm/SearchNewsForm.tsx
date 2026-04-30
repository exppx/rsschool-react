import React from 'react';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import { MAX_INPUT_LENGTH } from '@/constants/numbers';
import { TEXT } from '@/constants/text';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

import searchIcon from '@/assets/search.svg';
import styles from './SearchNewsForm.module.scss';

type SearchPokemonFormProps = Record<string, never>;

type SearchPokemonFormState = {
  searchRequest: string;
};

class SearchPokemonForm extends React.Component<SearchPokemonFormProps> {
  constructor(props: SearchPokemonFormProps) {
    super(props);

    this.onSubmit = this.onSubmit.bind(this);
  }

  state: SearchPokemonFormState = {
    searchRequest: localStorage.getItem(REQUEST_KEY) ?? '',
  };

  onSubmit(event: React.SubmitEvent) {
    event.preventDefault();

    const clearSearchRequest = this.state.searchRequest.trim();

    localStorage.setItem(REQUEST_KEY, clearSearchRequest);
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <Input
          name="search"
          placeholder={TEXT.features.news.searchPlaceholder}
          maxLength={MAX_INPUT_LENGTH}
          value={this.state.searchRequest}
          onChange={(e) => this.setState({ searchRequest: e.target.value })}
        />

        <Button type="submit">
          <img className={styles.buttonIcon} src={searchIcon} />
        </Button>
      </form>
    );
  }
}

export default SearchPokemonForm;
