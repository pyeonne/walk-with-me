import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';

const CardCreate = ({ style, user }) => {
  const clickHandler = (e) => {
    if (user.joinedPosts.length + user.applyPosts.length >= 8) {
      e.preventDefault();
      alert('더 이상 모임을 만들 수 없습니다');
    }
  }

  return (
    <div style={style} className={`${styles['card']} ${styles['create-card']}`}>
      <Button
        width='10rem'
        height='10rem'
        radius='50%'
        bg='#7EDA8B'
        ftsize='5rem'
        onClick={clickHandler}
      >
        <span>+</span>
      </Button>
      <span className={styles['create-card-span']}>새로운 모임 만들기</span>
    </div>
  );
};
export default CardCreate;
