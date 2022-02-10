import React, { memo, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import styles from './ProfileRegister.module.css';
import axios from 'axios';
import FileInput from '../../components/image_file_input/image_file_input';

const ProfileRegister = memo(() => {
  const formRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const areaRef = useRef();
  const [file, setFile] = useState();

  const onFileChange = (e) => setFile(e.target.files[0]);

  const onSubmit = (event) => {
    const { nickname } = nameRef.current;
    const { gender } = genderRef.current;
    const { age } = ageRef.current;
    const { area } = areaRef.current;

    console.log(nickname, gender, age, area);

    if (!nickname || !gender || !age || !area) {
      alert('이미지를 제외한 항목들은 필수 항목입니다.');
      return;
    }

    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', nickname);
    formData.append('gender', gender);
    formData.append('age', age | '');
    formData.append('area', area || '');

    axios('http://localhost:4000/api/auth/6200bb04d1edeba0b824faec/profile', {
      method: 'post',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    setFile();
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form
          ref={formRef}
          className={styles.form}
          encType='multipart/form-data'
          onSubmit={onSubmit}
        >
          <h2 className={styles.title}>
            처음 오셨군요? 기본 정보를 입력해주세요!
          </h2>

          <FileInput onFileChange={onFileChange} />

          <Input
            ref={nameRef}
            name='nickname'
            placeholder='닉네임'
            className={styles.input}
          />
          <Dropdown
            ref={genderRef}
            className={styles.input}
            type='gender'
            width='50rem'
            height='6rem'
          />
          <Input
            ref={ageRef}
            name='birthyear'
            placeholder='태어난 연도'
            type='number'
          />
          <Input
            ref={areaRef}
            name='area'
            placeholder='동 · 읍 · 면을 입력해주세요.'
          />
          <Button text='등록하기' />
        </form>
      </div>
    </>
  );
});

export default ProfileRegister;
