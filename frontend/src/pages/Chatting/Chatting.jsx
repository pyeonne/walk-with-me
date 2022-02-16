import React, { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Context } from '../../context';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';
import Avatar from '../../components/Avatar/Avatar';
import styles from './Chatting.module.css';
import { NOW_POST } from '../../context/actionTypes';
import { apiClient } from '../../api/api';
import io from 'socket.io-client';
import ScrollToBottom from 'react-scroll-to-bottom';

const currTab = '채팅방';

const Chatting = () => {
  const [state, dispatch] = useContext(Context);
  const { user, post } = state;
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [currMessage, setCurrMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const socket = useRef();

  useEffect(() => {
    socket.current = io('http://localhost:4000', {
      withCredentials: true,
      extraHeaders: {
        'post-id': postId,
        'user-id': user._id,
      },
    });
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
    socket.current.on('getUsers', (users) => {
      console.log(users);
    });
  }, [user]);

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
            <ScrollToBottom className='message-container'>
              {messageList.map((messageContent) => {
                return (
                  <div
                    className={styles.chat}
                    id={username === messageContent.author ? 'you' : 'other'}
                  >
                    <div className={styles.profile}>
                      <Avatar />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.author}>
                        <h3>{messageContent.author}</h3>
                        <p className={styles.date}>{messageContent.time}</p>
                      </div>
                      <h3 className={styles.content}>
                        {messageConafterprint.message}
                      </h3>
                    </div>
                  </div>
                );
              })}
            </ScrollToBottom>
            <input
              type='text'
              className={styles.input}
              placeholder='메시지를 입력하세요.'
              onChange={(event) => {
                setCurrMessage(event.target.value);
              }}
              // 엔터 눌렀을때 클릭처럼 인풋 보내짐
              onKeyPress={(event) => {
                event.key === 'Enter' && sendMessage();
              }}
            />
          </div>
          <div className={styles.list}>
            <div className={styles.user}>
              <div className={styles.profile}>
                <Avatar />
              </div>
              <div className={styles.author}>
                <h3>[모임장]닉네임</h3>
              </div>
            </div>
            <div className={styles.user}>
              <div className={styles.profile}>
                <Avatar />
              </div>
              <div className={styles.author}>
                <h3>[모임장]닉네임</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chatting;
