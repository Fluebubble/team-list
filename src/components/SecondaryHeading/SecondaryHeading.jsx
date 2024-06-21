import styles from './SecondaryHeading.module.scss';

export const SecondaryHeading = ({ title }) => {
  return <h2 className={styles.secondaryHeading}>{title}</h2>;
};
