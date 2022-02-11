import React from 'react';
import styles from './Header.module.css';
import darkMode from './images/darkMode.svg';
import Avatar from '../Avatar/Avatar';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';

const Header = (props) => {
  const navigate = useNavigate();

  return (
    <header className={styles['nav-bar']}>
      <div className={styles.wrapper}>
        <Logo className={styles.logo} type='row' />
        <div className={styles.right}>
          {props.isLoggedIn ? (
            <Avatar src={props.src} width='4rem' height='4rem' />
          ) : (
            <button className={styles['sign-in']} onClick={navigate('/signin')}>
              로그인
            </button>
          )}
          <button
            className={styles['sign-up']}
            onClick={
              props.isLoggedIn
                ? () => {
                    navigate('/');
                  }
                : () => {
                    navigate('/signup');
                  }
            }
          >
            {props.isLoggedIn ? '로그아웃' : '회원가입'}
          </button>
          <img className={styles['dark-mode']} src={darkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
