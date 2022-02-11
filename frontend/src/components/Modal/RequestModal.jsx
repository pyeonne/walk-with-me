import Modal from 'react-modal';
import Button from '../Button/Button';
import styles from './RequestModal.module.css';
import Input from '../Input/Input';
const RequestModal = (props) => {
  return (
    <Modal
      isOpen={props.isOpen}
      ariaHideApp={false}
      style={{
        content: {
          height: '40rem',
          width: '50rem',
          left: '50%',
          top: '50%',
          padding: '3rem',
          transform: 'translate(-50%, -50%)',
        },
      }}
    >
      <div className={styles['modal__container']}>
        <div className={styles['modal__header']}>
          <h2>자기소개를 입력해주세요!</h2>
        </div>
        <form method='POST'>
          <div className={styles['form__group']}>
            <Input name='content' height='20rem' />
            <div className={styles['btn__group']}>
              <Button
                type='button'
                text='닫기'
                height='5rem'
                width='18.2rem'
                // onClick={!props.isOpen}
              />
              <Button
                text='전송'
                height='5rem'
                width='18.2rem'
                // onClick={!props.isOpen}
              />
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default RequestModal;
