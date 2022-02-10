import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';
import contact from './images/contact_calender.svg';
import heartRed from './images/heart_red.svg';
import heartGray from './images/heart_gray.svg';

const CardDetail = ({ cardType, style, post }) => {
  // const {
  //   age,
  //   area,
  //   author,
  //   content,
  //   category,
  //   isRecruiting,
  //   likeMembers,
  //   members,
  //   _id,
  //   title,
  //   image,
  // } = post;
  // const ages = `${age}대`;
  // const tags = [area, ages];
  // const pic = likeMembers.map((likes, idx) => {
  //   if (idx < 3) return likes.profileImage;
  // });
  // return <></>;

  return (
    <div style={style} className={`${styles['card']} ${styles['detail-card']}`}>
      <div className={styles['tags']}>
        {tags.map((tag) => {
          const hashTag = `#${tag}`;
          return (
            <Button
              height='3rem'
              radius='25px'
              ftsize='1.2rem'
              text={hashTag}
              bg='#F3F5F8'
              color='#666666'
            />
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
            return <img src={p} />;
          })}
        </div>

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
        >
          {like === true ? <img src={heartRed} /> : <img src={heartGray} />}
        </Button>
      </div>
    </div>
  );
  return <></>;
};

// Card.defaultProps = {
//   cardType: 'create',
//   tags: [],
//   age: 0,
//   area: 'area',
//   author: {},
//   content: 'content',
//   category: 'category',
//   createdAt: 'createdAt',
//   isRecruiting: false,
//   likeMembers: [],
//   members: [],
//   preMembers: [],
//   updatedAt: 'updateAt',
//   _id: 'id',
//   title: 'title',
// };

export default CardDetail;
