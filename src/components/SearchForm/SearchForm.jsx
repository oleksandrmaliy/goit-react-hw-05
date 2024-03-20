import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import styles from './SearchForm.module.css';

const SearchForm = () => {
  const [query, setQuery] = useState('');
  const [, setSearchParams] = useSearchParams();

  const handleChange = ({ target }) => {
    setQuery(target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    setSearchParams({ query });
    setQuery('');
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input
        onChange={handleChange}
        value={query}
        type="text"
        autoComplete="off"
        autoFocus
        placeholder="Search movies"
        required
      />
      <button type="submit" className={styles.searchFormButton}>
        <span className={styles.searchFormButtonLabel}>Search</span>
      </button>
    </form>
  );
};

export default SearchForm;
