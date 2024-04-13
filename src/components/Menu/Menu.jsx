import styles from './Menu.module.scss';
// import Logo from '../../../public/images/logo.svg'

export const Menu = () => {
  return (
    <header>
      <img
        src="images/Logo.png"
        alt="Testtask logo"
        className={styles.logo}
      />
    </header>
  );
};
