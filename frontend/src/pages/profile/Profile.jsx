import React, { useState } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Header from '../../components/Header/Header';
import Arrow from './icons/Arrow';
import Explore from './icons/explore';
import Face from './icons/Face';
import styles from './profile.module.css';
import Pagination from '../../components/Pagination/Pagination';
import Calendar from './icons/Calendar';

const Profile = (props) => {
  const [like, setLike] = useState(false);
  const [my, setMy] = useState(false);
  const [apply, setApply] = useState(false);
  const activeLike = (event) => {
    setLike(!like);
  };
  const activeMy = (event) => {
    setMy(!my);
  };
  const activeApply = (event) => {
    setApply(!apply);
  };
  return (
    <div>
      <Header />
      <div className={styles.container}>
        <h2 className={styles.title}>나의 정보</h2>
        <div className={styles.profile}>
          <div className={styles.avatar}>
            <Avatar width='8rem' height='8rem' />
          </div>
          <div className={styles.info}>
            <div className={styles.name}>
              <h3>닉네임</h3>
              <p className={styles.date}>1994</p>
            </div>
            <div className={styles.areaWrapper}>
              <Explore />
              <h3 className={styles.area}>무슨시 모르겠동</h3>
            </div>
          </div>
        </div>
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
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
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
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
              <div className={styles.article}>
                <div className={styles.img}>
                  <img
                    src='https://images.unsplash.com/photo-1530788868903-53349eec267e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1958&q=80'
                    alt=''
                  />
                </div>
                <div className={styles.summary}>
                  <h3>런닝맨</h3>
                  <div className={styles.tags}>
                    <p className={styles.tag}>#자전거</p>
                    <p className={styles.tag}>#합정동</p>
                    <p className={styles.tag}>#30대</p>
                  </div>
                  <div className={styles.count}>
                    <Calendar />
                    <p>30명</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Profile;
