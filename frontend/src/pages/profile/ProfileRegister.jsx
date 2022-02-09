import React, { memo, useRef, useState } from 'react';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import styles from './ProfileRegister.module.css';

const ProfileRegister = ({ FileInput, onAdd }) => {
  const formRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const areaRef = useRef();
  const [file, setFile] = useState({ fileName: null, fileURL: null });

  const onFileChange = (file) => {
    setFile({
      fileName: file.name,
      fileURL: file.url,
    });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const profile = {
      id: Date.now(), // uuid
      name: nameRef.current.value || '',
      gender: genderRef.current.value || '',
      age: ageRef.current.value,
      area: areaRef.current.value || '',
      fileName: file.fileName || '',
      fileURL: file.fileURL || '',
    };
    console.log(profile);
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          <h2 className={styles.title}>
            처음 오셨군요? 기본 정보를 입력해주세요!
          </h2>
          <div className={styles.fileInput}>
            <FileInput
              name={file.fileName}
              fileURL={file.fileURL}
              onFileChange={onFileChange}
            />
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
          <Button text='등록하기' name='Add' />
        </form>
      </div>
    </>
  );
};

export default ProfileRegister;
