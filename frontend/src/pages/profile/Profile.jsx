import React, { useState, useEffect, useContext } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import { Context } from '../../context';
import Header from '../../components/Header/Header';
import Arrow from './icons/Arrow';
import Explore from './icons/explore';
import Face from './icons/Face';
import styles from './profile.module.css';
import Calendar from './icons/Calendar';
import { apiClient } from '../../api/api';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import { v4 as uuidv4 } from 'uuid';

const Profile = (props) => {
  const [state, dispatch] = useContext(Context);
  const [like, setLike] = useState(false);
  const [my, setMy] = useState(false);
  const [apply, setApply] = useState(false);
  const id = window.location.pathname.split('/')[1];
  const loading = 'loading...';

  const activeLike = (event) => {
    setLike(!like);
  };
  const activeMy = (event) => {
    setMy(!my);
  };
  const activeApply = (event) => {
    setApply(!apply);
  };
  const getUserInfo = async () => {
    try {
      // const res = await apiClient.get(`/api/auth/${id}/profile`);
      const res = await apiClient.get(
        `/api/auth/62091d412f72bc2c485af260/profile`
      );
      console.log(res.data);
      dispatch({ type: CHANGE_USER_INFO, payload: res.data });
    } catch (err) {
      alert(err);
    }
  };

  const getProfileImage = async () => {
    // const IMG_REGISTER_URL = `http://localhost:4000/api/auth/${id}/profile-image`;
    const IMG_REGISTER_URL = `http://localhost:4000/api/auth/62091d412f72bc2c485af260/profile-image`;
    const response = await fetch(IMG_REGISTER_URL);
    const blobImg = await response.blob();
    const profileImgURL = URL.createObjectURL(blobImg);
    dispatch({
      type: CHANGE_USER_INFO,
      payload: { ...state.user, profileImgURL },
    });
  };
  useEffect(() => {
    getUserInfo().then(getProfileImage());
  }, []);
  // return <>ddddd</>;
  if (state.user.likePosts === undefined) return <>{loading}</>;
  return (
    <div>
      <Header />
      {/* 회원 프로필 정보 */}
      <div className={styles.container}>
        <h2 className={styles.title}>나의 정보</h2>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Avatar width='8rem' height='8rem' src={state.user.profileImgURL} />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <h3>{state.user.nickname}</h3>
              <p className={styles.date}>{state.user.birthYear}년생</p>
            </div>
            <div className={styles.areaWrapper}>
              <Explore />
              <h3 className={styles.area}>{state.user.area}</h3>
            </div>
          </div>
        </div>
        {/* 목록 */}
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
              {state.user.likePosts.map((post) => {
                // console.log(post);
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
              })}
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
              {state.user.joinedPosts.map((post) => {
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
              })}
            </div>
          </div>
          {/* 가입 신청한 모임 */}
          {/* <div className={styles.wrapper} onClick={activeApply}>
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
              {state.user.applyPosts.map((post) => {
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
              })}
            </div>
          </div> */}
        </section>
      </div>
    </div>
  );
};

export default Profile;
