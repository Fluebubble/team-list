import styles from './Button.module.scss';

export const Button = ({ children, handleClick = () => {} }) => {
  return (
    <button
      type="button"
      className={styles.button}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
