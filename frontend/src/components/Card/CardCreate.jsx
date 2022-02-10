import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';

const CardCreate = ({ style, load }) => {
  if (load) {
    return <div style={style} className={`${styles['card']}`} />;
  }
  return (
    <div>
      <div
        style={style}
        className={`${styles['card']} ${styles['create-card']}`}
      >
        <Button
          width='10rem'
          height='10rem'
          radius='50%'
          bg='#7EDA8B'
          text='+'
          ftsize='5rem'
        />
        <span className={styles['create-card-span']}>새로운 모임 만들기</span>
      </div>
    </div>
  );
};
export default CardCreate;
