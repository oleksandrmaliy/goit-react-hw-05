import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styles from './MovieCast.module.css';

import getMovieCast from '../API/GetMovieCast';

const MovieCastInfo = () => {
  const [cast, setCast] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { id } = useParams();

  const defaultImg =
    'https://dl-media.viber.com/10/share/2/long/vibes/icon/image/0x0/95e0/5688fdffb84ff8bed4240bcf3ec5ac81ce591d9fa9558a3a968c630eaba195e0.jpg';

  useEffect(() => {
    const movieCast = async () => {
      try {
        setLoading(true);
        const response = await getMovieCast(id);
        setCast(response.data.cast);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    if (id) {
      movieCast();
    }
  }, [id]);

  const castCrew = cast.map(({ cast_id, name, character, profile_path }) => (
    <li className={styles.castItem} key={cast_id}>
      <img
        className={styles.castImg}
        src={
          profile_path
            ? `https://image.tmdb.org/t/p/w500/${profile_path}`
            : defaultImg
        }
        alt="No pics"
      />
      <p className={styles.castName}>{name}</p>
      <p className={styles.castCharacter}>Character: {character}</p>
    </li>
  ));

  return (
    <div>
      {loading && <p>...Loading</p>}
      {error && <h3>{error}</h3>}
      {Boolean(!cast.length && !loading) && (
        <p className={styles.noInfo}>
          We don't have any information about castcrew for this movie.
        </p>
      )}
      {Boolean(cast.length && !loading) && (
        <ul className={styles.castList}>{castCrew}</ul>
      )}
    </div>
  );
};

export default MovieCastInfo;
