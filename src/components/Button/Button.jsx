import styles from './Button.module.scss';

export const Button = ({
  text,
  type = 'button',
  handleClick = () => {},
  disabled = false,
}) => {
  return (
    <button
      type={type}
      className={styles.button}
      onClick={handleClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
