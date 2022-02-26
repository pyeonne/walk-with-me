import React, { useState } from 'react';
import Button from '../../components/Button/Button';
import Logo from '../../components/Header/Logo';
import Input from '../../components/Input/Input';
import styles from './SignIn.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/api';

const SignIn = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onFormChange = (event) => {
    const { name, value } = event.currentTarget;
    setForm((curr) => ({
      ...curr,
      [name]: value,
    }));
  };

  const googleLogin = async () => {
    window.open('https://elice-kdt-sw-1st-team6.elicecoding.com/api/auth/google', '_self');
  };

  const kakaoLogin = async () => {
    window.open('https://elice-kdt-sw-1st-team6.elicecoding.com/api/auth/kakao', '_self');
  };

  const localLogin = async () => {
    try {
      await apiClient.post('/api/auth/signIn', {
        email: form.email,
        password: form.password,
      });

      navigate('/');
    } catch (err) {
      alert('이메일 또는 비밀번호를 확인해주세요.');
    }
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    localLogin();
  };

  return (
    <div className={styles.container}>
      <div className={styles.logoArea}>
        <Logo type='col' />
      </div>
      <article>
        <div className={styles.formGroup}>
          <form method='POST' onSubmit={onSubmitHandler}>
            <Input
              type='email'
              name='email'
              placeholder='이메일'
              autoComplete='off'
              value={form.email}
              onChange={onFormChange}
              marginBottom='1rem'
              required
            />
            <Input
              type='password'
              name='password'
              placeholder='비밀번호'
              autoComplete='off'
              value={form.password}
              onChange={onFormChange}
              required
            />
            <div className={styles.forget}>
              <Link to='/password-find' className={styles.forgetTxt}>
                비밀번호를 잊어버리셨나요?
              </Link>
            </div>
            <Button
              type='submit'
              text='로그인'
              disabled={!(form.email !== '' && form.password !== '')}
            />
          </form>
        </div>
        <div className={styles.or}>
          <span>또는</span>
        </div>
        <div className={styles.socialGroup}>
          <Button
            text='카카오로 로그인'
            image='kakao'
            bg='var(--card-background-color)'
            color='var(--input-color)'
            border='1px solid var(--detail-card-border-color)'
            onClick={kakaoLogin}
          />
          <Button
            text='구글로 로그인'
            image='google'
            bg='var(--card-background-color)'
            color='var(--input-color)'
            border='1px solid var(--detail-card-border-color)'
            onClick={googleLogin}
          />
        </div>
        <div className={styles.footer}>
          <p>
            아직 계정이 없으신가요?{' '}
            <Link to='/signup' className={styles.intxt}>
              회원가입
            </Link>
          </p>
        </div>
      </article>
    </div>
  );
};

export default SignIn;
