import styles from './Header.module.scss';
import { Navigation } from './Navigation/Navigation';

export const Menu = () => {
  return (
    <header className={styles.header}>
      <a
        href="#"
        className={styles.logoLink}
      >
        <img
          src="images/Logo.png"
          alt="Testtask logo"
          className={styles.logo}
        />
      </a>
      <Navigation />
    </header>
  );
};
