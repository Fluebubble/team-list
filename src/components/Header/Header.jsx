import { HEADER_ID } from '../../constants';
import { Container } from '../Container/Container';
import styles from './Header.module.scss';
import { Navigation } from './Navigation/Navigation';

export const Header = () => {
  return (
    <Container>
      <header
        className={styles.header}
        id={HEADER_ID}
      >
        <a
          href="#"
          className={styles.logoLink}
        >
          <img
            src="images/Logo.svg"
            alt="Testtask logo"
            className={styles.logo}
          />
        </a>
        <Navigation />
      </header>
    </Container>
  );
};
