import { SecondaryHeading } from '../SecondaryHeading/SecondaryHeading';
import { EmployeesList } from './EmployeesList/EmployeesList';

export const EmployeesSection = () => {
  return (
    <section>
      <SecondaryHeading title={'Working with GET request'} />
      <EmployeesList />
    </section>
  );
};
