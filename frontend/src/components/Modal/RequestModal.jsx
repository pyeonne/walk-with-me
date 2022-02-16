import React from 'react';
import Button from '../Button/Button';
import styles from './RequestModal.module.css';
import Input from '../Input/Input';

const RequestModal = (props) => {
  return (
    <>
      <div className={styles.backdrop} onClick={props.onClick} />
      <div className={styles['modal__window']}>
        <div className={styles['modal__container']}>
          <div className={styles['modal__header']}>
            <h2>자기소개를 입력해주세요!</h2>
          </div>
          <form method='POST' onSubmit={props.onSubmit}>
            <div className={styles['form__group']}>
              <Input
                name='content'
                height='20rem'
                minLength={5}
                maxLength={250}
                placeholder='자기소개를 통해 자신을 어필해보세요! (최대 250글자)'
                value={props.value}
                onChange={props.onChange}
                required
              />
              <div className={styles['btn__group']}>
                <Button
                  type='button'
                  text='닫기'
                  height='5rem'
                  width='18.2rem'
                  bg='#cccccc'
                  onClick={props.onClick}
                />
                <Button
                  type='submit'
                  text='참가 신청'
                  height='5rem'
                  width='18.2rem'
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default RequestModal;
