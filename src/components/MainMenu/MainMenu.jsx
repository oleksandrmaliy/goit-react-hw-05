import { NavLink } from 'react-router-dom';
import styles from './MainMenu.module.css';

const mainMenu = () => {
  return (
    <>
      <ul className={styles.menu}>
        <li>
          <NavLink className={styles.link} to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/movies">
            Movies
          </NavLink>
        </li>
        <li>
          <NavLink className={styles.link} to="/contacts">
            Contacts
          </NavLink>
        </li>
        <div className={styles.divsvg}>
          <img
            className={styles.svg}
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg"
            alt="Ooops ("
          />
        </div>
      </ul>
    </>
  );
};

export default mainMenu;
