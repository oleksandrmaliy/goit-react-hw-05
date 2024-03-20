import { useState, useEffect } from 'react';
import { Link, useSearchParams, useLocation } from 'react-router-dom';

import SearchForm from '../../components/SearchForm/SearchForm';
import getMoviesList from '../../components/API/GetMoviesList';

import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  // const [query, setQuery] = useState('');
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [searchParams] = useSearchParams();
  const movie = searchParams.get('query');

  const location = useLocation();

  useEffect(() => {
    const moviesList = async () => {
      try {
        setLoading(true);
        const response = await getMoviesList(movie);
        const movies = response.data.results;
        setMoviesList(movies?.length ? [...movies] : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (movie) {
      moviesList();
    }
  }, [movie]);

  const searchedMoviesList = moviesList.map(({ id, title, name }) => (
    <li key={id}>
      <Link
        className={styles.movieLink}
        to={`/movies/${id}`}
        state={{ from: location }}
      >
        {title || name}
      </Link>
    </li>
  ));

  // const handleChange = ({ target }) => {
  //   setQuery(target.value);
  // };

  // const handleSubmit = event => {
  //   event.preventDefault();
  //   setSearchParams( {query}  );
  //   setQuery('');
  // };
  // const handleSubmit = value => {
  //   setSearchParams({ query: value });
  // };

  return (
    <div className={styles.movies}>
      <SearchForm />
      {/* // onChange={handleChange}
        // onSubmit={handleSubmit} */}

      {/* <form className={styles.form} onSubmit={handleSubmit}>
        <input
          onChange={handleChange}
          name="search"
          value={query}
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search movies"
          required
        />
        <button
          id="submitButton"
          type="submit"
          className={styles.searchFormButton}
        >
          <span className={styles.searchFormButtonLabel}>Search</span>
        </button>
      </form> */}

      {loading && <p>...Loading</p>}
      {error && <h3>{error}</h3>}
      {!loading && !error && (
        <ul className={styles.movieList}>{searchedMoviesList}</ul>
      )}
    </div>
  );
};

export default MoviesPage;
