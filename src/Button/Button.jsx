import styles from './Button.module.scss';

export const Button = ({ children }) => {
  return (
    <button
      type="button"
      className={styles.button}
    >
      {children}
    </button>
  );
};
