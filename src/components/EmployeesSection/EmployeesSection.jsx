import { USERS_SECTION_ID } from '../../constants';
import { SecondaryHeading } from '../SecondaryHeading/SecondaryHeading';
import { UsersList } from './UsersList/UsersList';
import styles from './EmployeesSection.module.scss';

export const EmployeesSection = () => {
  return (
    <section
      className={styles.section}
      id={USERS_SECTION_ID}
    >
      <SecondaryHeading title={'Working with GET request'} />
      <UsersList />
    </section>
  );
};
