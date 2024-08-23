import styles from './Navigation.module.scss';
import { Button } from '../../Button/Button';
import { handleScrollToSection } from '../../../helpers';
import { USERS_SECTION_ID } from '../../../constants';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Button handleClick={() => handleScrollToSection(USERS_SECTION_ID)}>
        Users
      </Button>
      <Button>Sign up</Button>
    </nav>
  );
};
