import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';
import heartRed from './images/heart_red.svg';
import heartGray from './images/heart_gray.svg';

const CardRecruit = ({ style, post }) => {
  let { author, tags, title, content, likeMembers, image, like } = post;
  return (
    <div
      style={style}
      className={`${styles['card']} ${styles['recruit-card']}`}
    >
      <img src={image} className={styles['recruit-img']} />
      <div className={styles['recruit-text']}>
        {
          <div className={styles['tags']}>
            {tags.map((tag) => {
              return (
                <Button
                  height='1.7rem'
                  radius='25px'
                  ftsize='1.2rem'
                  text={tag}
                  bg='#ffffff'
                  color='#7EDA8B'
                  border='#7EDA8B solid 1px'
                  style={{
                    flexBasis: 'content',
                    padding: '1rem',
                  }}
                />
              );
            })}
          </div>
        }
        <span className={styles['recruit-title']}>{title}</span>
        <span className={styles['recruit-subtitle']}>{content}</span>
      </div>
      <div className={styles['recruit-bottom']}>
        <div className={styles['author']}>
          <Button
            width='15rem'
            height='3rem'
            bg='#ffffff'
            color='#666666'
            ftsize='1.5rem'
            text={`by ${author.nickname}`}
          >
            {<img src={author.profileImage} />}
          </Button>
        </div>
        <div className={styles['likes']}>
          <Button
            width='8rem'
            height='4rem'
            border='1px solid #dddddd'
            color='#666666'
            radius='140px'
            flexBasis='center'
            bg='#ffffff'
            text={likeMembers.length}
            ftsize='1.6rem'
          >
            {like === true ? <img src={heartRed} /> : <img src={heartGray} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardRecruit;
