import styles from './Card.module.css';
import Button from '../Button/Button';
import contact from './images/contact_calender.svg';
import heartRed from './images/heart_red.svg';
import heartGray from './images/heart_gray.svg';
import { apiClient } from '../../api/api';
import { Context } from '../../context';
import React, { useEffect, useState, useContext } from 'react';
import { NOW_POST } from '../../context/actionTypes';
import { v4 as uuidv4 } from 'uuid';
import RequestModal from '../Modal/RequestModal';

const CardDetail = ({ style, post }) => {
  let [state, dispatch] = useContext(Context);
  let { members, tags, likeMembers, someLikeMembers, isRecruiting } = post;
  let [buttonText, setButtonText] = useState('참가하기');
  const [like, setLike] = useState(false);
  const user = state.user;

  // 모달
  const [isOpen, setIsOpen] = useState(false);
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  useEffect(() => {
    decideButtonText();
    setLike(state.post.likeMembers.indexOf(user?._id) !== -1);
  }, []);

  const modalHandler = () => {
    setIsOpen((curr) => !curr);
  };

  const contentHandler = (event) => setBio(event.currentTarget.value);

  const getPost = async () => {
    const response = await apiClient.get(`/api/posts/${state.post._id}`);
    dispatch({
      type: NOW_POST,
      payload: response.data,
    });
  };

  const joinRequest = async (event) => {
    event.preventDefault();
    await apiClient.post(`/api/posts/${post._id}/apply`, {
      text: bio,
    });

    getPost();
    alert('참가 신청이 완료 되었습니다!');
    modalHandler();
    setButtonText('참가 취소하기');
  };

  const joinRequestCancel = async () => {
    let isCancel;
    isCancel = confirm('참가 신청을 취소하시겠습니까?');

    if (isCancel) {
      await apiClient.post(`/api/posts/${post._id}/cancel`);
      getPost();
      alert('참가 신청이 취소되었습니다.');
      setButtonText('참가하기');
    }
  };

  const leave = async () => {
    let isLeave;
    isLeave = confirm('탈퇴하시겠습니까?');

    if (isLeave) {
      await apiClient.delete(`/api/posts/${state.post._id}/leave`);
      getPost();
      alert('모임에서 탈퇴되었습니다.');
      setButtonText('참가하기');
    }
  };

  const likeEvent = async () => {
    likeHandler();
    await apiClient.post('/api/posts/' + state.post._id + '/likes');
    getPost();
  };

  const unLikeEvent = async () => {
    likeHandler();
    await apiClient.delete('/api/posts/' + state.post._id + '/likes');
    getPost();
  };

  const isLike = (like) => {
    if (like) {
      unLikeEvent();
      return;
    }
    likeEvent();
  };

  const buttonHandler = (buttonText) => {
    if (buttonText === '참가 취소하기') {
      joinRequestCancel();
      return;
    }
    if (buttonText === '탈퇴하기') {
      leave();
      return;
    }
    if (buttonText === '참가하기') {
      modalHandler();
      return;
    }
  };
  const likeHandler = () => {
    setLike((prev) => !prev);
  };

  const decideButtonText = () => {
    const preMembersIdArr = post.preMembers.map((member) => member._id);
    const membersArr = post.members.map((member) => member._id);

    if (preMembersIdArr.indexOf(user?._id) !== -1) {
      setButtonText('참가 취소하기');
      return;
    }
    if (membersArr.indexOf(user?._id) !== -1) {
      setButtonText('탈퇴하기');
      return;
    }
  };

  const likeNumFormat = (num) => {
    let result;
    if (num >= 100000) {
      result = String(num / 10000) + '만';
      return result;
    }
    if (num >= 10000) {
      result = String(num / 10000) + '.' + String(num / 1000) + '만';
      return result;
    }
    if (num >= 1000) {
      result = String(num / 1000) + '.' + String(num / 100) + '천';
      return result;
    }
    result = String(num);
    return result;
  };

  return (
    <>
      <div
        style={style}
        className={`${styles['card']} ${styles['detail-card']}`}
      >
        <div className={styles.top}>
          <div className={styles['tags']}>
            {tags.map((tag) => (
              // component에 key props 을 넘길 시 컴포넌트가 항상 리랜더를 하게 됨 (리랜더 최적화 불가)
              <React.Fragment key={uuidv4()}>
                <Button
                  height='3rem'
                  radius='25px'
                  ftsize='1.2rem'
                  text={tag}
                  bg='#F3F5F8'
                  color='#666666'
                />
              </React.Fragment>
            ))}
          </div>
          <div className={styles['detail-text']}>
            <img src={contact} />
            <span>{members.length}명</span>
          </div>
        </div>
        <div className={styles.bottom}>
          <div className={styles['detail-buttons-middle']}>
            <Button
              width='24rem'
              height='5rem'
              border='1px solid #7EDA8B'
              color='#7EDA8B'
              text={isRecruiting === true ? '모집중' : '모집완료'}
              radius='140px'
              bg='#ffffff'
              disabled={true}
            />
            <Button
              width='24rem'
              height='5rem'
              color={
                user === null || post.author._id === user._id ? '#ccc' : '#333'
              }
              text={buttonText}
              radius='140px'
              bg={
                user === null || post.author._id === user._id
                  ? '#efefef'
                  : '#B2F2BB'
              }
              disabled={user === null || post.author._id === user._id}
              onClick={() => {
                buttonHandler(buttonText);
              }}
            />
          </div>
          <div className={styles['detail-buttons-bottom']}>
            <div className={styles['likes-people']}>
              {someLikeMembers.map((member) => {
                return <img key={uuidv4()} src={member.profileImgURL} />;
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
                ftsize='1.6rem'
                onClick={
                  user === null
                    ? () => {
                        alert('회원만 사용할 수 있는 기능입니다.');
                      }
                    : () => {
                        isLike(like);
                      }
                }
              >
                <img
                  className={styles.heart}
                  src={like === true ? heartRed : heartGray}
                />
                <span className={styles.likeMembersNum}>
                  {likeNumFormat(likeMembers.length)}
                </span>
              </Button>
            </div>
          </div>
        </div>
      </div>
      {isOpen && (
        <RequestModal
          isOpen={isOpen}
          value={bio}
          onClick={modalHandler}
          onChange={contentHandler}
          onSubmit={joinRequest}
        />
      )}
    </>
  );
};

export default CardDetail;
