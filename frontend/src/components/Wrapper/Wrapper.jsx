import React from 'react';
import styles from './Wrapper.module.css';

const Wrapper = ({ props, children }) => {
  return (
    <div style={{ ...props }} className={styles.wrapper}>
      {children}
    </div>
  );
};
export default Wrapper;
