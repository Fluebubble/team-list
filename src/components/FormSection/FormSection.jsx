import { FORM_SECTION_ID } from '../../constants';
import { SecondaryHeading } from '../SecondaryHeading/SecondaryHeading';
import { SignUpForm } from './SignUpForm/SignUpForm';

export const FormSection = () => {
  return (
    <section id={FORM_SECTION_ID}>
      <SecondaryHeading title="Working with POST request" />
      <SignUpForm />
    </section>
  );
};
