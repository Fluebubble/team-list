import { BG } from '../BG/BG';
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
      <BG type="yellow">{children}</BG>
    </button>
  );
};
