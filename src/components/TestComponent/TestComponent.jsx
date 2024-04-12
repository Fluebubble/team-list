import React from 'react';
import styles from './TestComponent.module.scss';
import classNames from 'classnames';

export const TestComponent = () => {
  return (
    <div className={styles.testComponent}>
      <h1>KekLol</h1>
      <p className={classNames(styles.testComponent_text)}>TestText</p>
    </div>
  );
};
