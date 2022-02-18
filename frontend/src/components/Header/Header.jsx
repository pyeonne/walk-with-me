import React, { useContext, useEffect, useState } from 'react';
import styles from './Header.module.css';
import darkMode from './images/darkMode.svg';
import lightMode from './images/lightMode.svg';
import Avatar from '../Avatar/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import { GET_DARK_MODE } from '../../context/actionTypes';
import { apiClient } from '../../api/api';

const bodyEl = document.getElementsByTagName('body')[0];

const Header = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [theme, setTheme] = useState(
    localStorage.getItem('bgMode') === null ||
      localStorage.getItem('bgMode') === 'light'
      ? true
      : false
  );

  const [proReg, setProReg] = useState(false);

  let { user } = state;
  if (!user) {
    user = JSON.parse(localStorage.getItem('loginUser'));
  }

  useEffect(() => {
    if (localStorage.getItem('bgMode') === 'dark') {
      bodyEl.classList.add('darkTheme');
      dispatch({
        type: GET_DARK_MODE,
        payload: true,
      });
    }
    setProReg(
      document.location.href.split('/').indexOf('profile-register') !== -1
    );
  }, []);

  const logoutHandler = async () => {
    localStorage.clear();
    if (state.darkMode === true) {
      localStorage.setItem('bgMode', 'dark');
    }
    dispatch({ type: CHANGE_USER_INFO, payload: null });
    await apiClient.get('/api/auth/signout');
    navigate('/');
  };

  const darkModeOnOff = () => {
    if (bodyEl.classList.contains('darkTheme')) {
      bodyEl.classList.remove('darkTheme');
      localStorage.setItem('bgMode', 'light');
      setTheme(!theme);
      dispatch({
        type: GET_DARK_MODE,
        payload: false,
      });
      return;
    }

    bodyEl.classList.add('darkTheme');
    localStorage.setItem('bgMode', 'dark');
    setTheme(!theme);
    dispatch({
      type: GET_DARK_MODE,
      payload: true,
    });
  };

  return (
    <header className={styles['nav-bar']}>
      <div className={styles.wrapper}>
        <Logo className={styles.logo} type='row' disabled={proReg} />
        <div className={styles.right}>
          {user ? (
            <Link
              to={`/${user._id}/profile`}
              onClick={(e) => {
                if (proReg) {
                  e.preventDefault();
                  alert('기본 정보를 입력해주세요');
                }
              }}
            >
              <Avatar src={user.profileImgURL} width='4rem' height='4rem' />
            </Link>
          ) : (
            <button className={styles['sign-in']}>
              <Link to='/signin'>로그인</Link>
            </button>
          )}
          {user ? (
            <button className={styles['logout']} onClick={logoutHandler}>
              로그아웃
            </button>
          ) : (
            <button className={styles['sign-up']}>
              <Link to='/signup'>회원가입</Link>
            </button>
          )}
          <img
            className={styles['dark-mode']}
            src={theme ? darkMode : lightMode}
            onClick={darkModeOnOff}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
