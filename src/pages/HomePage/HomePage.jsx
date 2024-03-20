import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './HomePage.module.css';

import getAllMovies from '../../components/API/GetTrendingMovies';

const nr = Math.round(Math.random() * 20);

const HomePage = () => {
  const [allMovies, setAllMovies] = useState([]);
  const [image, setImage] = useState('');
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
        setImage(
          `url(https://image.tmdb.org/t/p/w500${movies[nr].backdrop_path})`
        );
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    allMovies();
  }, []);

  const dailyTrend = allMovies.map(({ id, title, name }) => (
    <li className={styles.li} key={id}>
      <Link
        className={styles.linkage}
        to={`/movies/${id}`}
        state={{ from: location }}
      >
        {title || name}
      </Link>
    </li>
  ));

  return (
    <div
      style={
        image
          ? {
              backgroundImage: image,
              backgroundSize: 'cover',
            }
          : { backgroundColor: 'lightred' }
      }
      className={styles.home}
    >
      {loading && <p>...Loading</p>}
      {error && <h3>{error}</h3>}
      {Boolean(!loading && !error) && (
        <ul className={styles.list}>{dailyTrend}</ul>
      )}
    </div>
  );
};

export default HomePage;
