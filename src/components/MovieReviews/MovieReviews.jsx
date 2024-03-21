import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieReviews.module.css';

import getMovieReviews from '../API/GetMovieReviews';

const MovieReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchMovieReviews = async () => {
      try {
        setLoading(true);
        const response = await getMovieReviews(id);
        setReviews(response.data.results);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      fetchMovieReviews();
    }
  }, [id]);

  const reviewsData = reviews.map(({ id, author, content }) => (
    <li key={id}>
      <h3>Author: {author}</h3>
      <p>{content}</p>
    </li>
  ));

  return (
    <div>
      {loading && <p>...Loading</p>}
      {error && <h3>{error}</h3>}
      {Boolean(!reviews.length && !loading) && (
        <p className={styles.noInfo}>
          We don not have any reviews for this movie.
        </p>
      )}
      {Boolean(reviews.length && !loading) && <ul>{reviewsData}</ul>}
    </div>
  );
};

export default MovieReviews;
