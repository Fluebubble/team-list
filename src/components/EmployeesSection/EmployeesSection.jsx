import { USERS_SECTION_ID } from '../../constants';
import { SecondaryHeading } from '../SecondaryHeading/SecondaryHeading';
import { EmployeesList } from './EmployeesList/EmployeesList';
import styles from './EmployeesSection.module.scss';

export const EmployeesSection = () => {
  return (
    <section
      className={styles.section}
      id={USERS_SECTION_ID}
    >
      <SecondaryHeading title={'Working with GET request'} />
      <EmployeesList />
    </section>
  );
};
