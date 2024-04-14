import styles from './Navigation.module.scss';
import { Button } from '../../Button/Button';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Button>Users</Button>
      <Button>Sign up</Button>
    </nav>
  );
};
