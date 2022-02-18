import React, { useContext } from 'react';
import Logo from '../../components/Header/Logo';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { apiClient } from '../../api/api';
import styles from './PasswordEdit.module.css';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';

const PasswordEdit = () => {
  const [state, dispatch] = useContext(Context);

  const { _id: userId } = state?.user;
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // 유효성
  const [chkPassword, setChkPassword] = useState(false);
  const [chkConfirmPassword, setChkConfirmPassword] = useState(false);

  // success || error 메세지
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

  const passwordHandler = (event) => {
    const pwPattern = /(?=.*[a-zA-ZS])(?=.*?[#?!@$%^&*-]).{6,24}/; // 문자와 특수문자 조합의 6~24 자리
    const currentPw = event.currentTarget.value;
    setPassword(currentPw);

    if (!pwPattern.test(currentPw)) {
      setPasswordMessage(
        '영문자와 숫자,특수문자 조합의 6~24자리이어야 합니다.'
      );
      setChkPassword(false);
      return;
    }
    setPasswordMessage('훌륭합니다!');
    setChkPassword(true);
  };
  // 비번 체크
  const confirmPasswrdHandler = (event) => {
    const currentConfirmPw = event.currentTarget.value;
    setConfirmPassword(currentConfirmPw);

    if (password !== currentConfirmPw) {
      setConfirmPasswordMessage('비밀번호가 일치하지 않습니다.');
      setChkConfirmPassword(false);
      return;
    }
    setConfirmPasswordMessage('일치합니다!');
    setChkConfirmPassword(true);
  };

  const apiCall = async () => {
    try {
      const response = await apiClient.patch(
        `/api/auth/${userId}/profile/password`,
        {
          password,
        }
      );
      alert(response.data.success);
      dispatch({
        type: CHANGE_USER_INFO,
        payload: { ...state.user, password },
      });
      navigate(`/${userId}/profile`);
    } catch (err) {
      alert('비밀번호 변경에 실패했습니다.');
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    apiCall();
  };
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.logoArea}>
          <Logo type='col' />
        </div>
        <article className={styles.content}>
          <form method='POST' onSubmit={onSubmitHandler}>
            <Input
              type='password'
              name='password'
              placeholder='수정할 비밀번호'
              autoComplete='off'
              value={password}
              onChange={passwordHandler}
              marginBottom='1rem'
              required
            />
            {password.length > 0 && (
              <div className={styles.txtArea}>
                <small className={chkPassword ? styles.success : styles.error}>
                  {passwordMessage}
                </small>
              </div>
            )}
            <Input
              type='password'
              name='confirmPassword'
              placeholder='수정할 비밀번호 확인'
              autoComplete='off'
              value={confirmPassword}
              onChange={confirmPasswrdHandler}
              marginBottom='1rem'
              required
            />
            {confirmPassword.length > 0 && (
              <div className={styles.txtArea}>
                <small
                  className={chkConfirmPassword ? styles.success : styles.error}
                >
                  {confirmPasswordMessage}
                </small>
              </div>
            )}
            <Button
              className={styles.button}
              type='submit'
              text='비밀번호 수정'
              disabled={!(chkPassword && chkConfirmPassword)}
            />
          </form>
          <div className={styles.footer}>
            <Link className={styles['footer__link']} to={`/${userId}/profile`}>
              마이 페이지로 가기
            </Link>
          </div>
        </article>
      </div>
    </div>
  );
};

export default PasswordEdit;
