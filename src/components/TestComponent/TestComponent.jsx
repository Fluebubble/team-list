import React from 'react';
import styles from './TestComponent.module.scss';

export const TestComponent = () => {
  return (
    <div className={styles.testComponent}>
      <p className={styles.testComponent_text}>TestText</p>
    </div>
  );
};
