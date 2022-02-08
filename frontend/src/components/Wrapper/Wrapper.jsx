import React from 'react';
import styles from './Wrapper.module.css';

const Wrapper = ({ width, height, display, justifyContent, alignItems }) => {
  return (
    <div
      style={{ width, height, display, justifyContent, alignItems }}
      className={styles.wrapper}
    ></div>
  );
};
export default Wrapper;
