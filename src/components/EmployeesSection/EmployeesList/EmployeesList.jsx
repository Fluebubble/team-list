import axios from 'axios';
import styles from './EmployeesList.module.scss';
import { useEffect } from 'react';
import { getConfig } from '@testing-library/react';

export const EmployeesList = () => {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await axios.get(
          'https://frontend-test-assignment-api.abz.agency/token',
        );
        console.log(token);

        const response = await axios.get(
          'https://frontend-test-assignment-api.abz.agency/positions',
        );
        console.log(response);
      } catch (error) {
        console.error('Ошибка при получении данных:', error);
      }
    };

    fetchData();
  });

  return (
    <ul className={styles.list}>
      <li className={styles.listItem}>
        <img
          src="images/thumb/emp1.png"
          alt="Employee1"
          className={styles.employeeImg}
        />
        <p className={styles.text}>
          Salvador Stewart Flynn Thomas Salva Salvedorenko Kekov Andron Igorev
        </p>
        <div className={styles.textWrapper}>
          <p className={styles.text}>
            Leading specialist of the department of centLozhi kozhi bobi fobi
          </p>

          <p className={styles.text}>
            JeromeKlarkaJeromeKlarka1923362377123@kek.lol
          </p>

          <p className={styles.text}>+38 (098) 278 76 24</p>
        </div>
      </li>
      <li className={styles.listItem}>
        <img
          src="images/thumb/emp2.png"
          alt="Employee2"
          className={styles.employeeImg}
        />
        <p className={styles.text}>Takamaru Ayako Jurrien</p>
        <div className={styles.textWrapper}>
          <p className={styles.text}>Lead Independent Director</p>

          <p className={styles.text}>Takamuru@gmail.com</p>

          <p className={styles.text}>+38 (098) 278 90 24</p>
        </div>
      </li>
      <li className={styles.listItem}>
        <img
          src="images/thumb/emp1.png"
          alt="Employee1"
          className={styles.employeeImg}
        />
        <p className={styles.text}>Ilya</p>
        <div className={styles.textWrapper}>
          <p className={styles.text}>Co-Founder and CEO</p>

          <p className={styles.text}>Ilya_founder@gmail.com</p>

          <p className={styles.text}>+38 (098) 235 44 24</p>
        </div>
      </li>
      <li className={styles.listItem}>
        <img
          src="images/thumb/emp2.png"
          alt="Employee2"
          className={styles.employeeImg}
        />
        <p className={styles.text}>Alexandre</p>
        <div className={styles.textWrapper}>
          <p className={styles.text}>Lead Independent Director</p>

          <p className={styles.text}>Alexandr_develop@gmail.com</p>

          <p className={styles.text}>+38 (098) 198 44 24</p>
        </div>
      </li>
    </ul>
  );
};
