import classNames from 'classnames';
import styles from './TextInput.module.scss';
import { useField } from 'formik';

export const TextInput = ({ label, tip = null, ...props }) => {
  const [field, meta] = useField(props);
  console.log(meta);
  const showTip = tip && (!meta.error || !meta.touched);

  return (
    <div className={styles.inputWrapper}>
      <label
        htmlFor={props.id || props.name}
        className={classNames(styles.textFieldLabel, {
          [styles.textFieldLabelOnTop]: meta.value.length,
          [styles.textFieldLabelOnTopError]: meta.error && meta.touched,
        })}
      >
        {label}
      </label>
      <input
        className={classNames(styles.textField, {
          [styles.textFieldError]: meta.error && meta.touched,
        })}
        {...field}
        {...props}
      />
      {meta.error && meta.value && meta.touched && (
        <p className={classNames(styles.tip, styles.tipError)}>{meta.error}</p>
      )}
      {showTip && <p className={styles.tip}>{tip}</p>}
    </div>
  );
};
