import { formatPhone } from '../../../../helpers';
import styles from './UserCard.module.scss';

export const UserCard = ({ user }) => {
  const { name, email, phone, position, photo } = user;
  const formattedPhone = formatPhone(phone);
  const photoToRender =
    photo ===
      'https://frontend-test-assignment-api.abz.agency/images/placeholders/placeholder.png' &&
    photo !== null
      ? 'images/photo-cover.svg'
      : photo;

  return (
    <li className={styles.listItem}>
      <img
        src={photoToRender}
        alt={name}
        className={styles.employeeImg}
      />
      <p className={styles.text}>{name}</p>
      <div className={styles.textWrapper}>
        <p className={styles.text}>{position}</p>

        <p className={styles.text}>{email}</p>

        <p className={styles.text}>{formattedPhone}</p>
      </div>
    </li>
  );
};
