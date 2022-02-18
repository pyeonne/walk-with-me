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
import { v4 as uuidv4 } from 'uuid';

const currTab = '채팅방';

const Chatting = () => {
  const [state, dispatch] = useContext(Context);
  let { user, post } = state;
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(true);
  const [currMessage, setCurrMessage] = useState('');
  const [messageList, setMessageList] = useState([]);
  const socket = useRef();

  useEffect(() => {
    if (user === null) user = JSON.parse(localStorage.getItem('loginUser'));
    if (post === null) post = JSON.parse(localStorage.getItem('post'));

    socket.current = io('http://elice-kdt-sw-1st-team6.elicecoding.com:5000', {
      withCredentials: true,
      extraHeaders: {
        'post-id': postId,
        'user-id': user._id,
      },
    });
  }, []);

  useEffect(() => {
    socket.current.emit('addUser', user._id);
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
    if (post === null) post = JSON.parse(localStorage.getItem('post'));
    else localStorage.setItem('post', JSON.stringify(post));

    setMessageList(post.chat);
    return () => {
      dispatch({
        type: NOW_POST,
        payload: null,
      });
    };
  }, []);

  const sendMessage = async () => {
    if (currMessage) {
      const response = await apiClient.post(`/api/posts/${post._id}/chat`, {
        _id: user._id,
        nickname: user.nickname,
        text: currMessage,
        profileImgURL: user.profileImgURL,
      });

      post = { ...post, chat: response.data };
      localStorage.setItem('post', JSON.stringify(post));
      setCurrMessage('');
      setMessageList(response.data);
    }
  };

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
            <div className={styles.chatBody}>
              <ScrollToBottom className={styles.messageContainer}>
                {messageList.map((messageContent) => (
                  <div
                    key={messageContent.time}
                    className={styles.chat}
                    id={user._id === messageContent._id ? 'you' : 'other'}
                  >
                    <div className={styles.profile}>
                      <Avatar />
                    </div>
                    <div className={styles.info}>
                      <div className={styles.author}>
                        <h3>{messageContent.nickname}</h3>
                        <p className={styles.date}>
                          {new Date(messageContent.time).toLocaleString(
                            'ko-KR',
                            {
                              year: 'numeric',
                              month: 'numeric',
                              day: 'numeric',
                              hour: 'numeric',
                              minute: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                      <h3 className={styles.content}>{messageContent.text}</h3>
                    </div>
                  </div>
                ))}
              </ScrollToBottom>
            </div>
            ;
            <div className={styles.chatFooter}>
              <input
                type='text'
                className={styles.input}
                placeholder='메시지를 입력하세요.'
                value={currMessage}
                onChange={(event) => {
                  setCurrMessage(event.target.value);
                }}
                // 엔터 눌렀을때 클릭처럼 인풋 보내짐
                onKeyPress={(event) => {
                  event.key === 'Enter' && sendMessage();
                }}
              />
            </div>
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
