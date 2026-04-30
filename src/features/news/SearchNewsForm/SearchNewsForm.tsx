import React from 'react';
import type { NewsApiResponse } from '@news/types';
import { fetchNews } from '@news/api';
import { REQUEST_KEY } from '@/constants/localStorageKeys';
import { MAX_INPUT_LENGTH } from '@/constants/numbers';
import { TEXT } from '@/constants/text';
import { Button } from '@ui/Button';
import { Input } from '@ui/Input';

import searchIcon from '@/assets/search.svg';
import styles from './SearchNewsForm.module.scss';

type SearchPokemonFormProps = {
  onNewsReceived: (news: NewsApiResponse) => void;
  setIsLoading: (isLoading: boolean) => void;
  isLoading: Readonly<boolean>;
  setError: (error: string | null) => void;
};

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
    const previousRequest = localStorage.getItem(REQUEST_KEY) ?? '';

    if (clearSearchRequest === previousRequest) return;

    localStorage.setItem(REQUEST_KEY, clearSearchRequest);

    this.getNews(clearSearchRequest);
  }

  async getNews(request: string) {
    try {
      this.props.setError(null);
      this.props.setIsLoading(true);

      const news = await fetchNews(request);

      this.props.onNewsReceived(news);
    } catch (error) {
      if (error instanceof Error) {
        this.props.setError(error.message);
      }
    } finally {
      this.props.setIsLoading(false);
    }
  }

  componentDidMount(): void {
    const clearSearchRequest = this.state.searchRequest.trim();

    this.getNews(clearSearchRequest);
  }

  render() {
    return (
      <form className={styles.form} onSubmit={this.onSubmit}>
        <Input
          name="search"
          placeholder={TEXT.features.news.searchPlaceholder}
          maxLength={MAX_INPUT_LENGTH}
          disabled={this.props.isLoading}
          value={this.state.searchRequest}
          onChange={(e) => this.setState({ searchRequest: e.target.value })}
        />

        <Button type="submit" disabled={this.props.isLoading}>
          <img className={styles.buttonIcon} src={searchIcon} />
        </Button>
      </form>
    );
  }
}

export default SearchPokemonForm;
