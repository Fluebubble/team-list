import classNames from 'classnames';
import { formatPhone } from '../../../../helpers';
import { CustomTooltip } from './CustomTooltip/CustomTooltip';
import styles from './UserCard.module.scss';

export const UserCard = ({ user }) => {
  const { id, name, email, phone, position, photo } = user;
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
      <p
        className={classNames(styles.text, styles.textPointer)}
        data-tooltip-id={id + name}
        data-tooltip-content={name}
        data-tooltip-place="bottom-start"
        data-tooltip-float={true}
      >
        {name}
      </p>
      <CustomTooltip tooltipId={id + name} />
      <div className={styles.textWrapper}>
        <p className={styles.text}>{position}</p>
        <a
          className={classNames(styles.text, styles.textPointer)}
          href={`mailto:${email}`}
          data-tooltip-id={id + email}
          data-tooltip-content={email}
          data-tooltip-place="bottom-start"
          data-tooltip-float={true}
        >
          {email}
        </a>
        <CustomTooltip tooltipId={id + email} />

        <a
          className={styles.text}
          href={`tel:${formattedPhone}`}
        >
          {formattedPhone}
        </a>
      </div>
    </li>
  );
};
