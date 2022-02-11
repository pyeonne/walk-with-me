import styles from './Wrapper.module.css';

const Wrapper = ({ style, props, children }) => {
  return (
    <div style={{ style }} className={styles.wrapper}>
      {children}
    </div>
  );
};
export default Wrapper;
