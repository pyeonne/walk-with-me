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
    event.preventDefault();
    const formData = new FormData();
    formData.append('image', file);
    formData.append('name', nameRef.current.value);
    formData.append('gender', genderRef.current.value);
    formData.append('age', ageRef.current.value | '');
    formData.append('area', areaRef.current.value || '');

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

          <div className={styles.fileInput}>
            <FileInput onFileChange={onFileChange} />
          </div>

          <Input ref={nameRef} name='nickname' className={styles.input} />
          <Dropdown
            ref={genderRef}
            className={styles.input}
            type='gender'
            width='50rem'
            height='6rem'
          />
          <Dropdown
            ref={ageRef}
            className={styles.input}
            type='age'
            width='50rem'
            height='6rem'
          />
          <Input ref={areaRef} name='area' />
          <Button text='등록하기' />
        </form>
      </div>
    </>
  );
});

export default ProfileRegister;
