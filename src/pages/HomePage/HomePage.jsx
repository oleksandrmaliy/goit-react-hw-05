import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';

import getAllMovies from '../../components/API/GetTrendingMovies';
import MovieList from '../../components/MovieList/MovieList';

const HomePage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const location = useLocation();

  useEffect(() => {
    const allMovies = async () => {
      try {
        setLoading(true);
        const response = await getAllMovies();
        const movies = response.data.results;
        setAllMovies(movies?.length ? [...movies] : []);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    allMovies();
  }, []);

  return (
    <div className={styles.home}>
      {loading && <p>...Loading</p>}
      {error && <h3>{error}</h3>}
      {Boolean(!loading && !error) && (
        <MovieList moviesArray={allMovies} location={location} />
      )}
    </div>
  );
};

export default HomePage;
