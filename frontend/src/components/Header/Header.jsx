import React from 'react';
import styles from './Header.module.css';
import darkMode from './images/darkMode.svg';
import profile from './images/profile.svg';
import Logo from './Logo.jsx';

const Header = (props) => {
  return (
    <header className={styles['nav-bar']}>
      <div className={styles.wrapper}>
        <Logo className={styles.logo} type='row' />
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
