import React, { useContext, useEffect, useState } from 'react';
import styles from './Card.module.css';
import Button from '../Button/Button';
import heartRed from './images/heart_red.svg';
import heartGray from './images/heart_gray.svg';
import { v4 as uuidv4 } from 'uuid';
import { Context } from '../../context';
import { apiClient } from '../../api/api';

const CardRecruit = ({ post }) => {
  const { author, tags, title, content, likeMembers, image } = post;
  const [state, dispatch] = useContext(Context);
  const [profileImgURL, setProfileImgURL] = useState(null);
  const [like, setLike] = useState(post.like);
  const [likes, setLikes] = useState(likeMembers.length);
  const IMG_REGISTER_URL = `http://localhost:4000/api/auth/${author?._id}/profile-image`;

  const getProfileImage = async () => {
    const response = await fetch(IMG_REGISTER_URL);
    const blobImg = await response.blob();
    const profileImgURL = URL.createObjectURL(blobImg);
    setProfileImgURL(profileImgURL);
  };

  const likeHandler = async (e) => {
    e.preventDefault();
    if (like) {
      const response = await apiClient.delete(`/api/posts/${post._id}/likes`);
      setLikes(response.data.length);
    } else {
      const response = await apiClient.post(`/api/posts/${post._id}/likes`);
      setLikes(response.data.length);
    }

    setLike((prev) => !prev);
  };

  useEffect(() => {
    if (author?._id) {
      getProfileImage();
    }

    setLike(likeMembers.indexOf(state.user?._id) !== -1);

    return () => setProfileImgURL(profileImgURL);
  }, []);

  return (
    <div className={`${styles['card']} ${styles['recruit-card']}`}>
      <img src={image} className={styles['recruit-img']} />
      <div className={styles['recruit-info']}>
        <div className={styles['recruit-text']}>
          <div className={styles['tags']}>
            {tags.map((tag) => {
              return (
                <React.Fragment key={uuidv4()}>
                  <Button
                    height='1.7rem'
                    radius='25px'
                    ftsize='1.2rem'
                    text={tag}
                    bg='var(--recruit-button-background)'
                    color='#7EDA8B'
                    border='#7EDA8B solid 1px'
                    style={{
                      flexBasis: 'content',
                    }}
                  />
                </React.Fragment>
              );
            })}
          </div>
          <span className={styles['recruit-title']}>{title}</span>
          <span className={styles['recruit-subtitle']}>{content}</span>
        </div>
        <div className={styles['recruit-bottom']}>
          <div className={styles['author']}>
            <img src={profileImgURL} />
            <span>{`by ${author.nickname}`}</span>
          </div>
          <div className={styles['likes']}>
            <Button
              width='8rem'
              height='4rem'
              border='1px solid #dddddd'
              color='var(--recruit-text-color)'
              radius='140px'
              flexBasis='center'
              bg='var(--recruit-button-background)'
              text={likes}
              ftsize='1.6rem'
              onClick={
                state.user === null
                  ? (e) => {
                      e.preventDefault();
                      alert('회원만 사용할 수 있는 기능입니다.');
                    }
                  : (e) => {
                      likeHandler(e);
                    }
              }
            >
              {like === true ? <img src={heartRed} /> : <img src={heartGray} />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardRecruit;
