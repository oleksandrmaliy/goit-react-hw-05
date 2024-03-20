import styles from './ContactsPage.module.css';

const ContactsPage = () => {
  return (
    <div className={styles.contacts}>
      <a
        className={styles.webLink}
        target="_blank"
        rel="noreferrer"
        href="https://www.themoviedb.org/"
      >
        Visit TMDB page
      </a>
      <br />
      <a
        className={styles.webLink}
        target="_blank"
        rel="noreferrer"
        href="https://goit.global/ua/"
      >
        Visit GoIT page
      </a>
    </div>
  );
};

export default ContactsPage;
