import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';
import Avatar from '../../components/Avatar/Avatar';
import styles from './Chatting.module.css';
import { NOW_POST } from '../../context/actionTypes';
import { apiClient } from '../../api/api';
import { v4 as uuidv4 } from 'uuid';

const currTab = '채팅방';

const Chatting = () => {
  const [state, dispatch] = useContext(Context);
  const { user, post } = state;
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(true);

  const getPost = async () => {
    const response = await apiClient.get('/api/posts/' + postId);

    dispatch({
      type: NOW_POST,
      payload: response.data,
    });
    setLoading(false);
  };

  useEffect(() => {
    getPost();

    return () => {
      dispatch({
        type: NOW_POST,
        payload: null,
      });
    };
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Tab currTab={currTab} postId={postId} post={post} user={user} />
        <div className={styles.chatting}>
          <div className={styles.room}>
            <div className={styles.chat}>
              <div className={styles.profile}>
                <Avatar />
              </div>
              <div className={styles.info}>
                <div className={styles.author}>
                  <h3>닉네임</h3>
                  <p className={styles.date}>2022.01.27</p>
                </div>
                <h3 className={styles.content}>감사합니다.</h3>
              </div>
            </div>
            <div className={styles.chat}>
              <div className={styles.profile}>
                <Avatar />
              </div>
              <div className={styles.info}>
                <div className={styles.author}>
                  <h3>닉네임</h3>
                  <p className={styles.date}>2022.01.27</p>
                </div>
                <h3 className={styles.content}>감사합니다.</h3>
              </div>
            </div>
            <div className={styles.chat}>
              <div className={styles.profile}>
                <Avatar />
              </div>
              <div className={styles.info}>
                <div className={styles.author}>
                  <h3>닉네임</h3>
                  <p className={styles.date}>2022.01.27</p>
                </div>
                <h3 className={styles.content}>감사합니다.</h3>
              </div>
            </div>
            <input
              type='text'
              className={styles.input}
              placeholder='메시지를 입력하세요.'
            />
          </div>
          <div className={styles.list}>
            {/* 모임장 */}
            <div className={styles.user} key={uuidv4()}>
              <div className={styles.profile}>
                <Avatar />
              </div>
              <div className={styles.author}>
                <h3>[모임장] {post.author.nickname}</h3>
              </div>
            </div>
            {/* 멤버 */}
            {post.members.map((member) => (
              <div className={styles.user} key={uuidv4()}>
                <div className={styles.profile}>
                  <Avatar />
                </div>
                <div className={styles.author}>
                  <h3>{member.nickname}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
