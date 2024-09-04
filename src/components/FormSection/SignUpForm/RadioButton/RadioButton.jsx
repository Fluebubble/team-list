import classNames from 'classnames';
import styles from './RadioButton.module.scss';

export const RadioButton = ({ isSelected, children }) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={classNames(styles.radioButton, {
          [styles.radioButtonChecked]: isSelected,
          [styles.radioButtonUnchecked]: !isSelected,
        })}
      />
      {children}
    </div>
  );
};
