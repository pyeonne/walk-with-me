import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../../context';
import Header from '../../components/Header/Header';
import Arrow from './icons/Arrow';
import Face from './icons/Face';
import styles from './profile.module.css';
import { apiClient } from '../../api/api';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import MyProfile from './MyProfile';
import List from './List';
import { useParams } from 'react-router-dom';

const Profile = () => {
  const { id: userId } = useParams();
  const [state, dispatch] = useContext(Context);
  const [like, setLike] = useState(true);
  const [my, setMy] = useState(true);
  const [apply, setApply] = useState(true);
  const [loading, setLoading] = useState(true);

  const activeLike = () => {
    setLike(!like);
  };

  const activeMy = () => {
    setMy(!my);
  };

  const activeApply = () => {
    setApply(!apply);
  };

  const getUserInfo = async () => {
    const response = await apiClient.get(`/api/auth/${userId}/profile`);
    const { likePosts, joinedPosts, applyPosts } = response.data;
    dispatch({
      type: CHANGE_USER_INFO,
      payload: {
        ...state.user,
        likePosts,
        joinedPosts,
        applyPosts,
      },
    });
    setLoading(false);
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
      {/* 회원 프로필 정보 */}
      <div className={styles.container}>
        <MyProfile user={state.user} />
        {/* 내 관심 모임 */}
        <section className={styles.histories}>
          <div className={styles.wrapper} onClick={activeLike}>
            <div className={styles.like}>
              <div className={styles.subtitle}>
                <Face />
                <h1>내 관심 모임</h1>
              </div>
              <div className={`${styles.arrow} ${like && styles.active}`}>
                <Arrow />
              </div>
            </div>
            <div className={`${styles.lists} ${like && styles.open}`}>
              <List type='likePosts' user={state.user} />
            </div>
          </div>
          {/* 내 모임 */}
          <div className={styles.wrapper} onClick={activeMy}>
            <div className={styles.my}>
              <div className={styles.subtitle}>
                <Face />
                <h1>내 모임</h1>
              </div>
              <div className={`${styles.arrow} ${my && styles.active}`}>
                <Arrow />
              </div>
            </div>
            <div className={`${styles.lists} ${my && styles.open}`}>
              <List type='joinedPosts' user={state.user} />
            </div>
          </div>
          {/* 가입 신청한 모임 */}
          <div className={styles.wrapper} onClick={activeApply}>
            <div className={styles.apply}>
              <div className={styles.subtitle}>
                <Face />
                <h1>가입 신청한 모임</h1>
              </div>
              <div className={`${styles.arrow} ${apply && styles.active}`}>
                <Arrow />
              </div>
            </div>
            <div className={`${styles.lists} ${apply && styles.open}`}>
              <List type='applyPosts' user={state.user} />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
