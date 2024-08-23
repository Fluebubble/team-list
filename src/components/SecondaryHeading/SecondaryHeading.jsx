import styles from './SecondaryHeading.module.scss';

// h2 component
export const SecondaryHeading = ({ title }) => {
  return <h2 className={styles.secondaryHeading}>{title}</h2>;
};
