import { FORM_SECTION_ID } from '../../constants';
import { SecondaryHeading } from '../SecondaryHeading/SecondaryHeading';
import { SignUpForm } from './SignUpForm/SignUpForm';
import styles from './FormSection.module.scss';

export const FormSection = () => {
  return (
    <section
      id={FORM_SECTION_ID}
      className={styles.formSection}
    >
      <SecondaryHeading title="Working with POST request" />
      <SignUpForm />
    </section>
  );
};
