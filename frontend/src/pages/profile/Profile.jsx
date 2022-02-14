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

const Profile = (props) => {
  const [state, dispatch] = useContext(Context);
  const [like, setLike] = useState(false);
  const [my, setMy] = useState(false);
  const [apply, setApply] = useState(false);
  const id = window.location.pathname.split('/')[1];
  const [load, setLoad] = useState(true);
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
    try {
      const res = await apiClient.get(`/api/auth/${id}/profile`);
      // console.log(res.data);
      dispatch({ type: CHANGE_USER_INFO, payload: res.data });
    } catch (err) {
      alert(err);
    }
  };

  const getProfileImage = async () => {
    const IMG_REGISTER_URL = `http://localhost:4000/api/auth/${id}/profile-image`;
    const response = await fetch(IMG_REGISTER_URL);
    const blobImg = await response.blob();
    const profileImgURL = URL.createObjectURL(blobImg);
    dispatch({
      type: CHANGE_USER_INFO,
      payload: { ...state.user, profileImgURL },
    });
  };
  const changeState = async () => {
    setLoad(false);
  };
  useEffect(() => {
    getUserInfo().then(getProfileImage());
    // getProfileImage();
  }, []);
  // if (load) return <>load</>;
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
              {/* <List type='applyPosts' user={state.user} /> */}
              {/* {state.user.applyPosts.map((post) => {
                return (
                  <div key={uuidv4()} className={styles.article}>
                    <div className={styles.img}>
                      <img src={post.image} alt='' />
                    </div>
                    <div className={styles.summary}>
                      <h3>{post.title}</h3>
                      <div className={styles.tags}>
                        {[
                          `#${post.area}`,
                          `#${post.age}대`,
                          `#${post.category}`,
                        ].map((tag) => {
                          return (
                            <p key={uuidv4()} className={styles.tag}>
                              {tag}
                            </p>
                          );
                        })}
                      </div>
                      <div className={styles.count}>
                        <Calendar />
                        <p>{post.members.length}명</p>
                      </div>
                    </div>
                  </div>
                );
              })} */}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
