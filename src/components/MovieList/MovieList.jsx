import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';

const MovieList = ({ moviesArray, location }) => {
  return moviesArray.map(({ id, title, name }) => (
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
};

export default MovieList;
