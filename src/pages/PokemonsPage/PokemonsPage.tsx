import React from 'react';
import { SearchPokemonForm } from '@pokemons/SearchPokemonForm';

import styles from './PokemonsPage.module.scss';

class PokemonsPage extends React.Component {
  render() {
    return (
      <>
        <section className={styles.search}>
          <SearchPokemonForm />
        </section>

        <section className={styles.results}></section>
      </>
    );
  }
}

export default PokemonsPage;
