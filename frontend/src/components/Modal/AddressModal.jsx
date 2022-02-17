import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import styles from './RequestModal.module.css';
const AddressModal = (props) => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onClick} />
      <div className={styles['modal__window']}>
        <DaumPostcode
          style={{ height: '36.5rem' }}
          onComplete={props.onComplete}
          onClose={props.onClose}
        />
      </div>
    </>
  );
};

export default AddressModal;
