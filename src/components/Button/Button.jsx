import styles from './Button.module.scss';

export const Button = ({
  type = 'button',
  handleClick = () => {},
  children,
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={handleClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
