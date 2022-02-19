import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';

const CardCreate = ({ style, user }) => {
  return (
    <div style={style} className={`${styles['card']} ${styles['create-card']}`}>
      <Button
        width='10rem'
        height='10rem'
        radius='50%'
        bg='#7EDA8B'
        ftsize='5rem'
        onClick={(e) => {
          console.log(user);
          if (user.joinedPosts.length >= 8) {
            e.preventDefault();
            alert('더 이상 모임을 만들 수 없습니다');
          }
        }}
      >
        <span>+</span>
      </Button>
      <span className={styles['create-card-span']}>새로운 모임 만들기</span>
    </div>
  );
};
export default CardCreate;
