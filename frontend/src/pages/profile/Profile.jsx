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
import { Link, useParams } from 'react-router-dom';
import Button from '../../components/Button/Button';

const Profile = () => {
  const { id: userId } = useParams();
  const [state, dispatch] = useContext(Context);
  const [loading, setLoading] = useState(true);
  const [toggle, setToggle] = useState({
    likes: true,
    joined: true,
    apply: true,
  });

  const toggleHandler = (type) => {
    setToggle((prev) => ({
      ...prev,
      [type]: !prev[type],
    }));
  };

  const getUserInfo = async () => {
    const response = await apiClient.get(`/api/auth/${userId}/profile`);
    const { likePosts, joinedPosts, applyPosts } = response.data;
    dispatch({
      type: CHANGE_USER_INFO,
      payload: {
        ...response.data,
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
          <div
            className={styles.wrapper}
            onClick={() => toggleHandler('likes')}
          >
            <div className={styles.like}>
              <div className={styles.subtitle}>
                <Face />
                <h1>내 관심 모임</h1>
              </div>
              <div
                className={`${styles.arrow} ${toggle.likes && styles.active}`}
              >
                <Arrow />
              </div>
            </div>
            <div className={`${styles.lists} ${toggle.likes && styles.open}`}>
              <List type='likePosts' user={state.user} />
            </div>
          </div>
          {/* 내 모임 */}
          <div
            className={styles.wrapper}
            onClick={() => toggleHandler('joined')}
          >
            <div className={styles.my}>
              <div className={styles.subtitle}>
                <Face />
                <h1>내 모임</h1>
              </div>
              <div
                className={`${styles.arrow} ${toggle.joined && styles.active}`}
              >
                <Arrow />
              </div>
            </div>
            <div className={`${styles.lists} ${toggle.joined && styles.open}`}>
              <List type='joinedPosts' user={state.user} />
            </div>
          </div>
          {/* 가입 신청한 모임 */}
          <div
            className={styles.wrapper}
            onClick={() => toggleHandler('apply')}
          >
            <div className={styles.apply}>
              <div className={styles.subtitle}>
                <Face />
                <h1>가입 신청한 모임</h1>
              </div>
              <div
                className={`${styles.arrow} ${toggle.apply && styles.active}`}
              >
                <Arrow />
              </div>
            </div>
            <div className={`${styles.lists} ${toggle.apply && styles.open}`}>
              <List type='applyPosts' user={state.user} />
            </div>
          </div>
          <div className={styles.btnGroup}>
            <Button width='45%'>
              <Link to={`/${state.user._id}/profile-edit`}>수정하기</Link>
            </Button>
            <Button width='45%'>
              <Link to={`/${state.user._id}/password-edit`}>비밀번호 변경</Link>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
