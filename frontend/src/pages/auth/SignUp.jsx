import Button from '../../components/Button/Button';
import Logo from '../../components/Header/Logo';
import Input from '../../components/Input/Input';
import { useState, useContext } from 'react';
import styles from './SignUp.module.css';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/api';

const SignUp = () => {
  const [state, dispatch] = useContext(Context);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();
  // 유효성
  const [chkEmail, setChkEmail] = useState(false);
  const [chkPassword, setChkPassword] = useState(false);
  const [chkConfirmPassword, setChkConfirmPassword] = useState(false);

  // success || error 메세지
  const [emailMessage, setEmailMessage] = useState('');
  const [passwordMessage, setPasswordMessage] = useState('');
  const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

  // 핸들러
  // 이메일
  const emailHandler = (event) => {
    const emailPattern =
      /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    const currentEmail = event.currentTarget.value;
    setEmail(currentEmail);

    if (!emailPattern.test(currentEmail)) {
      setEmailMessage('이메일 형식이 유효하지 않습니다.');
      setChkEmail(false);
      return;
    }
    setEmailMessage('올바른 이메일 형식입니다!');
    setChkEmail(true);
  };
  // 비번
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
      const response = await apiClient.post('/api/auth/signup', {
        email,
        password,
      });
      dispatch({
        type: CHANGE_USER_INFO,
        payload: response.data,
      });

      localStorage.setItem('loginUser', JSON.stringify(response.data));
      navigate('/profile-register');
    } catch (err) {
      alert('중복된 이메일입니다.');
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    apiCall();
  };
  return (
    <div className={styles.container}>
      <div className={styles.logoArea}>
        <Logo type='col' />
      </div>
      <article className={styles.content}>
        <form method='POST' onSubmit={onSubmitHandler}>
          <Input
            type='email'
            name='email'
            placeholder='이메일'
            autoComplete='off'
            value={email}
            onChange={emailHandler}
            marginBottom='1rem'
            required
          />
          {email.length > 0 && (
            <div className={styles.txtArea}>
              <small className={chkEmail ? styles.success : styles.error}>
                {emailMessage}
              </small>
            </div>
          )}
          <Input
            type='password'
            name='password'
            placeholder='비밀번호'
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
            placeholder='비밀번호 확인'
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
            type='submit'
            text='회원가입'
            disabled={!(chkEmail && chkPassword && chkConfirmPassword)}
          />
        </form>
        <div className={styles.footer}>
          <p>
            이미 계정이 있으신가요?{' '}
            <Link to='/signin' className={styles.logtxt}>
              로그인하기
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
};
export default SignUp;
