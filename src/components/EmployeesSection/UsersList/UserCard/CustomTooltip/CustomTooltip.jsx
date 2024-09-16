import { Tooltip } from 'react-tooltip';
import styles from './CustomTooltip.module.scss';

export const CustomTooltip = ({ tooltipId }) => {
  return (
    <Tooltip
      id={tooltipId}
      className={styles.tooltip}
      noArrow={true}
      offset={25}
    />
  );
};
