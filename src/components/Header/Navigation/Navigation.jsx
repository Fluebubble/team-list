import styles from './Navigation.module.scss';
import { Button } from '../../Button/Button';
import { handleScrollToSection } from '../../../helpers';
import { FORM_SECTION_ID, USERS_SECTION_ID } from '../../../constants';

export const Navigation = () => {
  return (
    <nav className={styles.nav}>
      <Button
        text="Users"
        handleClick={() => handleScrollToSection(USERS_SECTION_ID)}
      />
      <Button
        text="Sign up"
        handleClick={() => handleScrollToSection(FORM_SECTION_ID)}
      />
    </nav>
  );
};
