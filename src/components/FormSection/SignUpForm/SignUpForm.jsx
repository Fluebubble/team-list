import { Field, Form, Formik } from 'formik';
import { Button } from '../../Button/Button';
import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/api';
// import { RotatingLines } from 'react-loader-spinner';
import styles from './SignUpForm.module.scss';
import classNames from 'classnames';

const POSITIONS_URL = '/positions';

export const SignUpForm = () => {
  const [positions, setPositions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);

  // const formik = useFormik({
  //   initialValues: {
  //     name: '',
  //     email: '',
  //     phone: '',
  //     position: 'Frontend developer',
  //   },
  //   onSubmit: (values) => {
  //     alert(JSON.stringify(values, null, 2));
  //   },
  // });

  // console.log('formik', formik);

  useEffect(() => {
    const getPositions = async () => {
      try {
        setIsLoading(true);

        const response = await apiClient(POSITIONS_URL);

        setPositions(response.data.positions);
        console.log(response);
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPositions();
  }, []);

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phone: '',
      }}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
    >
      {({ handleSubmit, values }) => (
        <Form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <div className={styles.textFieldsWrapper}>
            <div className={styles.inputWrapper}>
              <label
                htmlFor="name"
                className={classNames(styles.textFieldLabel, {
                  [styles.textFieldLabelOnTop]: values.name.length,
                })}
              >
                Your name
              </label>
              <Field
                id="name"
                name="name"
                type="text"
                // placeholder="Your name"
                className={styles.textField}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label
                htmlFor="email"
                className={classNames(styles.textFieldLabel, {
                  [styles.textFieldLabelOnTop]: values.email.length,
                })}
              >
                Email
              </label>
              <Field
                id="email"
                name="email"
                type="email"
                className={styles.textField}
              />
            </div>
            <div className={styles.inputWrapper}>
              <label
                htmlFor="phone"
                className={classNames(styles.textFieldLabel, {
                  [styles.textFieldLabelOnTop]: values.phone.length,
                })}
              >
                Phone
              </label>
              <Field
                id="phone"
                name="phone"
                type="tel"
                className={styles.textField}
              />
              <p className={styles.tip}>+38 (XXX) XXX - XX - XX</p>
            </div>
          </div>
          {/* {isLoading && (
            <RotatingLines
              width="50"
              visible={true}
              strokeColor="#000000"
            />
          )} */}
          <fieldset>
            <legend>Select your position</legend>
            {positions.map(({ id, name }) => (
              <div key={id}>
                <Field
                  type="radio"
                  name="position"
                  value={name}
                  id={name}
                />
                <label htmlFor={name}>{name}</label>
              </div>
            ))}
          </fieldset>
          <Button type="submit">Sign up</Button>
        </Form>
      )}
    </Formik>
  );
};
