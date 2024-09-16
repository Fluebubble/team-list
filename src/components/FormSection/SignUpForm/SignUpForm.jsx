import classNames from 'classnames';
import * as Yup from 'yup';
import styles from './SignUpForm.module.scss';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { Button } from '../../Button/Button';
import { useContext, useEffect, useRef, useState } from 'react';
import { apiClient } from '../../../api/api';
import { RadioButton } from './RadioButton/RadioButton';
import { Preloader } from '../../Preloader/Preloader';
import {
  EMAIL_REGEXP,
  PHONE_REGEXP,
  POSITIONS_URL,
  USERS_TO_LOAD,
} from '../../../constants';
import { UsersContext } from '../../../context/context';
import useLoadUsers from '../../../hooks/useLoadUsers';
import { TextInput } from './TextInput/TextInput';

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

export const SignUpForm = ({ isUserRegistered, setIsUserRegistered }) => {
  const { setUsers, setNextPageUrl } = useContext(UsersContext);
  const { loadUsers } = useLoadUsers();

  const [positions, setPositions] = useState([]);
  const [arePositionsLoading, setArePositionsLoading] = useState(false);
  const isInitalMount = useRef(true);

  useEffect(() => {
    if (isInitalMount.current) {
      isInitalMount.current = false;

      return;
    }

    loadUsers();
  }, [isUserRegistered]);

  const [initialFormValues, setInitialFormValues] = useState({
    name: '',
    email: '',
    phone: '',
    position_id: null,
    photo: null,
  });

  const getPositions = async () => {
    try {
      setArePositionsLoading(true);

      const response = await apiClient(POSITIONS_URL);

      setPositions(response.data.positions);

      if (response.data.positions.length) {
        setInitialFormValues((prevInitialValues) => ({
          ...prevInitialValues,
          position_id: response.data.positions[0].id,
        }));
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      setArePositionsLoading(false);
    }
  };

  //loading positions list to form
  useEffect(() => {
    getPositions();
  }, []);

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
      onSubmit={(values, { setSubmitting }) => {
        const sendFormData = async () => {
          try {
            const responseWithToken = await apiClient.get('/token');
            const token = responseWithToken.data.token;

            await apiClient.post('/users', values, {
              headers: {
                Token: token,
                'Content-Type': 'multipart/form-data',
              },
            });

            setIsUserRegistered(true);
            setUsers([]);
            setNextPageUrl(`/users?page=1&count=${USERS_TO_LOAD}`);
          } catch (error) {
            throw new Error(error);
          }
        };

        sendFormData();
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
              <TextInput
                label="Your name"
                id="name"
                name="name"
                type="text"
              />

              <TextInput
                label="Email"
                id="email"
                name="email"
                type="text"
              />

              <TextInput
                label="Phone"
                id="phone"
                name="phone"
                type="text"
                onFocus={(field) => {
                  if (!field.value) {
                    setFieldValue('phone', '+380');
                  }
                }}
                tip="+38 (XXX) XXX - XX - XX"
              />
            </div>
            {arePositionsLoading && <Preloader />}
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
                        className="visuallyHidden"
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
                  className="visuallyHidden"
                  onChange={(event) => {
                    setFieldValue('photo', event.currentTarget.files[0]);
                    setFieldTouched('photo', true, false);
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
                text="Sign up"
                type="submit"
                disabled={isSignUpButtonDisabled}
              />
            </div>
          </Form>
        );
      }}
    </Formik>
  );
};
