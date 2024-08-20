import { Field, Form, Formik, useFormik } from 'formik';
import { Button } from '../../Button/Button';
import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/api';
import { RotatingLines } from 'react-loader-spinner';
import styles from './SignUpForm.module.scss';

const POSITIONS_URL = '/positions';

export const SignUpForm = () => {
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      phone: '',
      position: 'Frontend developer',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  console.log('formik', formik);

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
      {({ handleSubmit }) => (
        <Form
          onSubmit={handleSubmit}
          className={styles.form}
        >
          <Field
            id="name"
            name="name"
            type="text"
            placeholder="Your name"
            className={styles.textField}
          />
          <Field
            id="email"
            name="email"
            type="email"
            placeholder="Email"
            className={styles.textField}
          />
          <Field
            id="phone"
            name="phone"
            type="number"
            placeholder="Phone"
            className={styles.textField}
          />
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
