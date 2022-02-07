import React from 'react';
import styles from './Header.module.css';
import logo from './images/logo.svg';
import darkMode from './images/darkMode.svg';
import profile from './images/profile.svg';

const Header = (props) => {
  return (
    <header className={styles['nav-bar']}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src={logo} />
        <div className={styles.right}>
          {props.isLoggedIn ? (
            <img className={styles['profile-image']} src={profile} />
          ) : (
            <button className={styles['sign-in']}>로그인</button>
          )}
          <button className={styles['sign-up']}>
            {props.isLoggedIn ? '로그아웃' : '회원가입'}
          </button>
          <img className={styles['dark-mode']} src={darkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
