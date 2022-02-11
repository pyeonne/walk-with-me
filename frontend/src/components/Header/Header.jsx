import React, { useContext } from 'react';
import styles from './Header.module.css';
import darkMode from './images/darkMode.svg';
import Avatar from '../Avatar/Avatar';
import { Link } from 'react-router-dom';
import Logo from './Logo.jsx';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';

const Header = (props) => {
  const [state, dispatch] = useContext(Context);
  const user = state.user;

  const clickHandler = () => {
    dispatch({ type: CHANGE_USER_INFO, payload: null });
    fetch('http://localhost:4000/api/auth/signout');
  };

  return (
    <header className={styles['nav-bar']}>
      <div className={styles.wrapper}>
        <Logo className={styles.logo} type='row' />
        <div className={styles.right}>
          {user ? (
            <Avatar src={props.src} width='4rem' height='4rem' />
          ) : (
            <button className={styles['sign-in']}>
              <Link to='/signin'>로그인</Link>
            </button>
          )}

          {user ? (
            <button className={styles['logout']} onClick={clickHandler}>
              로그아웃
            </button>
          ) : (
            <button className={styles['sign-up']}>
              <Link to='/signup'>회원가입</Link>
            </button>
          )}
          <img className={styles['dark-mode']} src={darkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
