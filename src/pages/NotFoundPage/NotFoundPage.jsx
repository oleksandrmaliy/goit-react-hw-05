import { Link } from 'react-router-dom';
import styles from './NotFoundPage.module.css';

const NotFoundPage = () => {
  return (
    <div className={styles.notfound}>
      <Link to="/">To Home Page</Link>
      <h2>Such page was Not Found</h2>
    </div>
  );
};

export default NotFoundPage;
