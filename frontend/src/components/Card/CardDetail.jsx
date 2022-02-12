import React, { useState } from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';
import contact from './images/contact_calender.svg';
import heartRed from './images/heart_red.svg';
import heartGray from './images/heart_gray.svg';
import { v4 as uuidv4 } from 'uuid';
const CardDetail = ({ style, post }) => {
  let { members, tags, likeMembers, pic, isRecruiting } = post;
  const [like, setLike] = useState(post.like);
  const likeHandler = async (e) => {
    e.preventDefault();
    setLike((prev) => !prev);
  };

  return (
    <div style={style} className={`${styles['card']} ${styles['detail-card']}`}>
      <div className={styles['tags']}>
        {tags.map((tag) => {
          const hashTag = `${tag}`;
          return (
            // component에 key props 을 넘길 시 컴포넌트가 항상 리랜더를 하게 됨 (리랜더 최적화 불가)
            <React.Fragment key={uuidv4()}>
              <Button
                height='3rem'
                radius='25px'
                ftsize='1.2rem'
                text={hashTag}
                bg='#F3F5F8'
                color='#666666'
              />
            </React.Fragment>
          );
        })}
      </div>
      <div className={styles['detail-text']}>
        <img src={contact} />
        <span>{members.length}명</span>
      </div>
      <div className={styles['detail-buttons-middle']}>
        <Button
          width='26rem'
          height='6rem'
          border='1px solid #7EDA8B'
          color='#7EDA8B'
          text={isRecruiting === true ? '모집중' : '모집완료'}
          radius='140px'
          bg='#ffffff'
          className={styles['recruit-button']}
        />
        <Button
          width='26rem'
          height='6rem'
          color='#666666'
          text='참가 신청'
          radius='140px'
          bg='#B2F2BB'
        />
      </div>

      <div className={styles['detail-buttons-bottom']}>
        <div className={styles['likes-people']}>
          {pic.map((p) => {
            return <img key={uuidv4()} src={p} />;
          })}
        </div>
        <div className={styles['likes']}>
          <Button
            width='10rem'
            height='4.6rem'
            border='1px solid #dddddd'
            color='#666666'
            radius='140px'
            flexBasis='center'
            bg='#ffffff'
            text={likeMembers.length}
            ftsize='1.6rem'
            onClick={(e) => likeHandler(e)}
          >
            {like === true ? <img src={heartRed} /> : <img src={heartGray} />}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;
