import { useState, useEffect, useRef, Suspense } from 'react';
import { Link, Outlet, useParams, useLocation } from 'react-router-dom';
import getSingleMovie from '../../components/API/GetSingleMovie';

import styles from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [year, setYear] = useState('');
  const [genres, setGenres] = useState(null);

  const { id } = useParams();
  const location = useLocation();
  const ref = useRef(location.state?.from ?? '/');

  const defaultImg = `https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg`;

  useEffect(() => {
    const singleMovie = async () => {
      try {
        setLoading(true);
        const response = await getSingleMovie(id);
        setMovie(response.data ? response.data : {});
        setYear(response.data.release_date.substr(0, 4));
        setGenres(response.data.genres.map(genre => genre.name).join(', '));
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      singleMovie();
    }
  }, [id]);

  const up = () => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  };

  const show = () => {
    setTimeout(
      () =>
        window.scrollTo({
          top: 550,
          left: 0,
          behavior: 'smooth',
        }),
      500
    );
  };

  const { poster_path, title, vote_average, overview } = movie;

  return (
    <div className={styles.detailsPage}>
      <Link className={styles.backButton} to={ref.current}>
        Go Back (To Future)
      </Link>
      {loading && <p>...Loading</p>}
      {error && <h3>{error}</h3>}
      <div className={styles.block}>
        <img
          className={styles.poster}
          src={
            poster_path
              ? `https://image.tmdb.org/t/p/w500${poster_path}`
              : defaultImg
          }
          alt="Sorry, no poster"
        />
        <div className={styles.info}>
          <h2 className={styles.title}>
            {title} ({year})
          </h2>
          <span>
            <span>User Score: </span>
            {vote_average ? (
              `${Math.round(vote_average * 10)}%`
            ) : (
              <span>No info</span>
            )}
          </span>
          <h3>Overview</h3>
          <div>{overview ? overview : <p>No info</p>}</div>
          <h4>Genres</h4>
          <div>{genres ? genres : <p>No info</p>}</div>
        </div>
      </div>
      <div>
        <h4 className={styles.addInfo}>Additional information</h4>
        <ul className={styles.addInfList}>
          <li>
            <Link to="cast" onClick={show}>
              Cast
            </Link>
          </li>
          <li>
            <Link to="reviews" onClick={show}>
              Reviews
            </Link>
          </li>
        </ul>
        <Suspense fallback={<div>...Loading</div>}>
          <Outlet />
        </Suspense>
      </div>
      <button className={styles.upBtn} type="button" onClick={up}>
        Up
      </button>
    </div>
  );
};

export default MovieDetailsPage;
