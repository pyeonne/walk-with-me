import React, { useContext, useEffect } from 'react';
import styles from './Header.module.css';
import darkMode from './images/darkMode.svg';
import Avatar from '../Avatar/Avatar';
import { Link, useNavigate } from 'react-router-dom';
import Logo from './Logo.jsx';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import { apiClient } from '../../api/api';

const Header = () => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
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

  useEffect(() => {
    if (user?._id) {
      getProfileImage();
    }
  }, []);

  const clickHandler = async () => {
    navigate('/');
    dispatch({ type: CHANGE_USER_INFO, payload: null });
    await apiClient.get('/api/auth/signout');
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
          <img className={styles['dark-mode']} src={darkMode} />
        </div>
      </div>
    </header>
  );
};

export default Header;
