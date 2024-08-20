import classNames from 'classnames';
import styles from './BG.module.scss';

export const BG = ({ type, children }) => {
  return (
    <div
      className={classNames(styles.bg, {
        [styles.yellow]: type === 'yellow',
        [styles.blue]: type === 'blue',
        [styles.lightGray]: type === 'light-gray',
      })}
    >
      {children}
    </div>
  );
};
