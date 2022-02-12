import React from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';
import contact from './images/contact_calender.svg';
import heartRed from './images/heart_red.svg';
import heartGray from './images/heart_gray.svg';
import { apiClient } from '../../api/api';
import { Context } from '../../context';
import { useEffect, useState, useContext } from 'react';
import { NOW_POST } from '../../context/actionTypes';

const CardDetail = ({ style, post }) => {
  let [state, dispatch] = useContext(Context);
  let { members, tags, likeMembers, like, pic, isRecruiting } = post;
  let [buttonText, setButtonText] = useState('참가하기');
  const user = state.user;

  const getPost = async () => {
    try {
      const response = await apiClient.get('/api/posts/' + state.post._id);
      console.log(response.data);
      dispatch({
        type: NOW_POST,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
  // const joinRequest = async () => {
  //   try {
  //     await apiClient.post('/api/posts/' + post._id + '/apply', {
  //       postId: post._id,
  //       userId: user._id,
  //     });
  //     getPost();
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const joinRequestCancel = async () => {
    try {
      await apiClient.post('/api/posts/' + state.post._id + '/cancel');
      getPost();
    } catch (err) {
      console.log(err);
    }
  };

  const withdraw = async () => {
    try {
      await apiClient.delete(
        '/api/posts/' + state.post._id + '/management/' + user._id
      );
      getPost();
    } catch (err) {
      console.log(err);
    }
  };

  const joinRequest = () => {
    console.log('hi');
  };

  const buttonHandler = (buttonText) => {
    if (buttonText === '참가 취소하기') {
      joinRequestCancel();
      return;
    }
    if (buttonText === '탈퇴하기') {
      withdraw();
      return;
    }
    if (buttonText === '참가하기') {
      joinRequest();
      return;
    }
  };

  const decideButtonText = () => {
    if (state.post.preMembers.indexOf(user?._id) !== -1) {
      setButtonText('참가 취소하기');
      return;
    }
    if (state.post.members.indexOf(user?._id) !== -1) {
      setButtonText('탈퇴하기');
      return;
    }
  };

  useEffect(() => {
    decideButtonText();
  }, []);

  return (
    <div style={style} className={`${styles['card']} ${styles['detail-card']}`}>
      <div className={styles['tags']}>
        {tags.map((tag) => {
          const hashTag = `${tag}`;
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
          className={styles['recruit-button']}
        />
        <Button
          width='26rem'
          height='6rem'
          color={
            user === null || post.author._id === user._id
              ? '#CCCCCC'
              : '#666666'
          }
          text={buttonText}
          radius='140px'
          bg='#B2F2BB'
          disabled={user === null || post.author._id === user._id}
          onClick={() => {
            buttonHandler(buttonText);
          }}
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
};

export default CardDetail;
