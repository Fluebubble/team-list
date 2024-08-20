import styles from './Button.module.scss';

export const Button = ({
  type = 'button',
  handleClick = () => {},
  children,
}) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={handleClick}
    >
      {children}
    </button>
  );
};
