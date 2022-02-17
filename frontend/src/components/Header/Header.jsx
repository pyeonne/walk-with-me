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

const Header = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const [theme, setTheme] = useState(
    localStorage.getItem('bgMode') === null ||
      localStorage.getItem('bgMode') === 'light'
      ? true
      : false
  );
  const loginUser = localStorage.getItem('loginUser');

  const user = state.user;
  const IMG_REGISTER_URL = `http://localhost:4000/api/auth/${user?._id}/profile-image`;

  const getProfileImage = async () => {
    const response = await fetch(IMG_REGISTER_URL);
    const blobImg = await response.blob();
    const profileImgURL = URL.createObjectURL(blobImg);
    dispatch({
      type: CHANGE_USER_INFO,
      payload: { ...state.user, profileImgURL },
    });
  };

  const getUserInfo = async () => {
    const response = await apiClient.get(
      '/api/auth/' + loginUser.substring(8, 32) + '/profile'
    );
    dispatch({
      type: CHANGE_USER_INFO,
      payload: response.data,
    });
  };

  useEffect(() => {
    if (loginUser && state.user === null) {
      getUserInfo().then(getProfileImage);
    } else if (loginUser && state.user.profileImgURL === undefined) {
      getProfileImage();
    }

    if (localStorage.getItem('bgMode') === 'dark') {
      document.getElementsByTagName('body')[0].classList.add('darkTheme');
      dispatch({
        type: GET_DARK_MODE,
        payload: true,
      });
    }
  }, []);

  const clickHandler = async () => {
    navigate('/');
    localStorage.clear();
    if (state.darkMode === true) {
      localStorage.setItem('bgMode', 'dark');
    }
    dispatch({ type: CHANGE_USER_INFO, payload: null });
    await apiClient.get('/api/auth/signout');
  };

  const darkModeOnOff = () => {
    if (
      document.getElementsByTagName('body')[0].classList.contains('darkTheme')
    ) {
      document.getElementsByTagName('body')[0].classList.remove('darkTheme');
      localStorage.setItem('bgMode', 'light');
      setTheme(!theme);
      dispatch({
        type: GET_DARK_MODE,
        payload: false,
      });
      return;
    }

    document.getElementsByTagName('body')[0].classList.add('darkTheme');
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
        <Logo className={styles.logo} type='row' />
        <div className={styles.right}>
          {user ? (
            <Link to={`/${user._id}/profile`}>
              <Avatar src={user.profileImgURL} width='4rem' height='4rem' />
            </Link>
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
