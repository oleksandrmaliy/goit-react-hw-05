import { useState, useEffect } from 'react';
import { useSearchParams, useLocation } from 'react-router-dom';

import SearchForm from '../../components/SearchForm/SearchForm';
import getMoviesList from '../../components/API/GetMoviesList';
import MovieList from '../../components/MovieList/MovieList';

import styles from './MoviesPage.module.css';

const MoviesPage = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [counter, setCounter] = useState(false);

  const [searchParams] = useSearchParams();
  const movie = searchParams.get('query');

  const location = useLocation();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        setCounter(true);
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
      fetchMovies();
    }
  }, [movie]);

  return (
    <div className={styles.movies}>
      <SearchForm />
      {loading && <p className={styles.info}> ...Loading</p>}
      {error && <h3>{error}</h3>}
      {Boolean(moviesList.length) && (
        <MovieList moviesArray={moviesList} location={location} />
      )}
      {Boolean(!moviesList.length & !loading & !error & counter) && (
        <p className={styles.info}>No movie with such title</p>
      )}
    </div>
  );
};

export default MoviesPage;
