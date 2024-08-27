import { Field, Form, Formik } from 'formik';
import { Button } from '../../Button/Button';
import { useEffect, useState } from 'react';
import { apiClient } from '../../../api/api';
import * as Yup from 'yup';
// import { RotatingLines } from 'react-loader-spinner';
import styles from './SignUpForm.module.scss';
import classNames from 'classnames';
import { RadioButton } from './RadioButton/RadioButton';

const POSITIONS_URL = '/positions';

export const SignUpForm = () => {
  const [positions, setPositions] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [isLoading, setIsLoading] = useState(false);
  // eslint-disable-next-line no-unused-vars
  const [initialValues, setInitialValues] = useState({
    name: '',
    email: '',
    phone: '',
    position: null,
    photo: null,
  });
  const validationSchema = Yup.object({
    name: Yup.string().required('Enter your name'),
  });

  useEffect(() => {
    const getPositions = async () => {
      try {
        setIsLoading(true);

        const response = await apiClient(POSITIONS_URL);

        setPositions(response.data.positions);
        console.log(response);

        if (response.data.positions.length) {
          setInitialValues((prevInitialValues) => ({
            ...prevInitialValues,
            position: response.data.positions[0].name,
          }));
        }
      } catch (error) {
        console.log(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    getPositions();
  }, []);

  useEffect(() => {
    console.log(initialValues);
  }, [initialValues]);

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(values, { setSubmitting }) => {
        console.log(values);
        setSubmitting(false);
      }}
      enableReinitialize
    >
      {({ handleSubmit, setFieldValue, values }) => (
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
          <fieldset className={styles.radioFieldset}>
            <legend className={styles.radioLegend}>Select your position</legend>
            <div className={styles.radioList}>
              {positions.map(({ id, name }) => (
                <div key={id}>
                  <label htmlFor={name}>
                    <RadioButton
                      isSelected={values.position === name}
                      key={id}
                    >
                      {name}
                    </RadioButton>
                    <Field
                      type="radio"
                      name="position"
                      value={name}
                      id={name}
                      className={styles.visuallyHidden}
                    />
                    {/* {name} */}
                  </label>
                </div>
              ))}
            </div>
          </fieldset>
          <div className={styles.inputWrapper}>
            <label
              htmlFor="file"
              className={styles.inputFileLabel}
            >
              <input
                id="file"
                name="file"
                type="file"
                className={styles.visuallyHidden}
                onChange={(event) => {
                  setFieldValue('photo', event.currentTarget.files[0]);
                }}
              />
              {/* <button
                type="button"
                className={styles.inputFileButton}
              >
                Upload
              </button> */}
              <div className={styles.inputFileButton}>
                <p>Upload</p>
              </div>
              <div className={styles.inputFileInfo}>
                {/* <p>Upload your photo</p> */}
                {values.photo ? (
                  <p className={styles.fileName}>{values.photo.name}</p>
                ) : (
                  <p className={styles.fileNamePlaceholder}>Upload your photo</p>
                )}
              </div>
            </label>
          </div>
          <div className={styles.submitButtonWrapper}>
            <Button type="submit">Sign up</Button>
          </div>
        </Form>
      )}
    </Formik>
  );
};
