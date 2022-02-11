import Modal from 'react-modal';
import Button from '../Button/Button';
import styles from './RequestModal.module.css';
const RequestModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      ariaHideApp={false}
      style={{
        content: {
          height: '50%',
          width: '40%',
          left: '50%',
          top: '50%',
          padding: '3rem',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <div className={styles.content}></div>
      <div className={styles['btn__group']}>
        <Button
          text='닫기'
          height='5rem'
          width='20rem'
          onClick={!props.isOpen}
        />
        <Button
          text='전송'
          height='5rem'
          width='20rem'
          onClick={!props.isOpen}
        />
      </div>
    </Modal>
  );
};

export default RequestModal;
