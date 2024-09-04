import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from '../../Button/Button';
import { useContext, useEffect, useState } from 'react';
import { apiClient } from '../../../api/api';
import * as Yup from 'yup';
import styles from './SignUpForm.module.scss';
import classNames from 'classnames';
import { RadioButton } from './RadioButton/RadioButton';
import { Preloader } from '../../Preloader/Preloader';
import { EMAIL_REGEXP, PHONE_REGEXP } from '../../../constants';
import { UsersContext } from '../../../context/context';

const POSITIONS_URL = '/positions';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Minimum 2 symbols')
    .max(60, 'Maximum 60 symbols')
    .required('Enter your name'),
  email: Yup.string()
    .matches(EMAIL_REGEXP, 'Enter correct email')
    .required('Enter your email'),
  phone: Yup.string()
    .matches(PHONE_REGEXP, 'Not valid format. Try this +38 (XXX) XXX - XX - XX')
    .required('Enter your phone'),
  photo: Yup.mixed()
    .required('Choose your photo')
    .test(
      'fileType',
      'Supported only jpg/jpeg format',
      (value) => !value || (value && ['image/jpeg'].includes(value.type)),
    )
    .test(
      'fileSize',
      'The file is too large',
      (value) => !value || (value && value.size <= 1024 * 1024 * 5),
    )
    .test(
      'fileDimension',
      'The minimum resolution should be 70x70 pixels',
      (value) => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = URL.createObjectURL(value);
          img.onload = () => {
            const { width, height } = img;
            URL.revokeObjectURL(img.src);
            resolve(width >= 70 && height >= 70);
          };
          img.onerror = reject;
        });
      },
    ),
});

export const SignUpForm = ({ isUserRegistered, handleUserRegistration }) => {
  const { setUsers } = useContext(UsersContext);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log(positions);
  }, [positions]);

  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: null,
    photo: null,
  });

  const getPositions = async () => {
    try {
      setIsLoading(true);

      const response = await apiClient(POSITIONS_URL);

      setPositions(response.data.positions);
      console.log(response);

      if (response.data.positions.length) {
        setInitialFormValues((prevInitialValues) => ({
          ...prevInitialValues,
          position_id: response.data.positions[0].id,
        }));
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getPositions();
  }, []);

  // useEffect(() => {
  //   console.log(initialFormValues);
  // }, [initialFormValues]);

  return isUserRegistered ? (
    <div className={styles.successfulImageWrapper}>
      <img
        className={styles.successfulImage}
        src="images/success-image.svg"
        alt="Registration completed"
      />
    </div>
  ) : (
    <Formik
      initialValues={initialFormValues}
      validationSchema={validationSchema}
      onSubmit={(values, { setSubmitting, errors }) => {
        console.log(values, errors);

        const sendFormData = async () => {
          try {
            const responseWithToken = await apiClient.get('/token');
            const token = responseWithToken.data.token;
            console.log(token);

            const responseWithApprove = await apiClient.post('/users', values, {
              headers: {
                Token: token,
                'Content-Type': 'multipart/form-data',
              },
            });

            handleUserRegistration(true);
            setUsers()
            console.log(responseWithApprove.data);
          } catch (error) {
            console.log(error);
          }
        };

        sendFormData();
        set;
        setSubmitting(false);
      }}
      enableReinitialize
    >
      {({
        handleSubmit,
        setFieldValue,
        setFieldTouched,
        isSubmitting,
        values,
        errors,
        touched,
      }) => {
        const isSignUpButtonDisabled =
          isSubmitting ||
          errors.name ||
          !values.name ||
          errors.email ||
          !values.email ||
          errors.phone ||
          !values.phone ||
          errors.photo ||
          !values.photo;

        return (
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
                    [styles.textFieldLabelOnTopError]:
                      errors.name && touched.name,
                  })}
                >
                  Your name
                </label>
                <Field
                  id="name"
                  name="name"
                  type="text"
                  className={classNames(styles.textField, {
                    [styles.textFieldError]: errors.name && touched.name,
                  })}
                />
                {errors.name && touched.name && (
                  <p className={classNames(styles.tip, styles.tipError)}>
                    <ErrorMessage name="name" />
                  </p>
                )}
              </div>

              <div className={styles.inputWrapper}>
                <label
                  htmlFor="email"
                  className={classNames(styles.textFieldLabel, {
                    [styles.textFieldLabelOnTop]: values.email.length,
                    [styles.textFieldLabelOnTopError]:
                      errors.email && touched.email,
                  })}
                >
                  Email
                </label>
                <Field
                  id="email"
                  name="email"
                  type="text"
                  className={classNames(styles.textField, {
                    [styles.textFieldError]: errors.email && touched.email,
                  })}
                />
                <p className={classNames(styles.tip, styles.tipError)}>
                  <ErrorMessage name="email" />
                </p>
              </div>

              <div className={styles.inputWrapper}>
                <label
                  htmlFor="phone"
                  className={classNames(styles.textFieldLabel, {
                    [styles.textFieldLabelOnTop]: values.phone.length,
                    [styles.textFieldLabelOnTopError]:
                      errors.phone && touched.phone,
                  })}
                >
                  Phone
                </label>
                <Field
                  id="phone"
                  name="phone"
                  type="text"
                >
                  {({ field }) => (
                    <input
                      {...field}
                      className={classNames(styles.textField, {
                        [styles.textFieldError]: errors.phone && touched.phone,
                      })}
                      onFocus={() => {
                        if (!field.value) {
                          setFieldValue('phone', '+380');
                        }
                      }}
                    />
                  )}
                </Field>
                {errors.phone && touched.phone ? (
                  <p className={classNames(styles.tip, styles.tipError)}>
                    <ErrorMessage name="phone" />
                  </p>
                ) : (
                  <p className={styles.tip}>+38 (XXX) XXX - XX - XX</p>
                )}
              </div>
            </div>
            {isLoading && <Preloader />}
            <fieldset className={styles.radioFieldset}>
              <legend className={styles.radioLegend}>
                Select your position
              </legend>
              <div className={styles.radioList}>
                {positions.map(({ id, name }) => (
                  <div key={id}>
                    <label htmlFor={name}>
                      <RadioButton
                        isSelected={values.position_id === id}
                        key={id}
                      >
                        {name}
                      </RadioButton>
                      <Field
                        type="radio"
                        name="position_id"
                        value={id}
                        id={name}
                        className={styles.visuallyHidden}
                        onChange={(e) =>
                          setFieldValue('position_id', +e.target.value)
                        }
                      />
                    </label>
                  </div>
                ))}
              </div>
            </fieldset>
            <div
              className={classNames(
                styles.inputWrapper,
                styles.inputWrapperBottomMargin,
              )}
            >
              <label
                htmlFor="photo"
                className={styles.inputFileLabel}
              >
                <input
                  id="photo"
                  name="photo"
                  type="file"
                  className={styles.visuallyHidden}
                  onChange={(event) => {
                    setFieldValue('photo', event.currentTarget.files[0]);
                    setFieldTouched('photo', true, false);
                    console.log(values);
                  }}
                  accept="image/png, image/jpeg"
                />
                <div
                  className={classNames(styles.inputFileButton, {
                    [styles.inputFileButtonError]:
                      errors.photo && touched.photo,
                  })}
                >
                  <p>Upload</p>
                </div>

                <div
                  className={classNames(styles.inputFileInfo, {
                    [styles.inputFileInfoError]: errors.photo && touched.photo,
                  })}
                >
                  {values.photo ? (
                    <p className={styles.fileName}>{values.photo.name}</p>
                  ) : (
                    <p className={styles.fileNamePlaceholder}>
                      Upload your photo
                    </p>
                  )}
                </div>
              </label>
              {errors.photo && (
                <p className={classNames(styles.tip, styles.tipError)}>
                  <ErrorMessage name="photo" />
                </p>
              )}
            </div>
            <div className={styles.submitButtonWrapper}>
              <Button
                type="submit"
                disabled={isSignUpButtonDisabled}
              >
                Sign up
              </Button>
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
