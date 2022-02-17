import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';

const CardCreate = ({ style, load }) => {
  if (load) {
    return <div style={style} className={`${styles['card']}`} />;
  }
  return (
    <div style={style} className={`${styles['card']} ${styles['create-card']}`}>
      <Button
        width='10rem'
        height='10rem'
        radius='50%'
        bg='#7EDA8B'
        ftsize='5rem'
      >
        <span>+</span>
      </Button>
      <span className={styles['create-card-span']}>새로운 모임 만들기</span>
    </div>
  );
};
export default CardCreate;
