import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ moviesArray, location }) => {
  const moviesArrayItems = moviesArray.map(({ id, title, name }) => (
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
  return <ul className={styles.moviesList}>{moviesArrayItems}</ul>;
};

export default MovieList;
