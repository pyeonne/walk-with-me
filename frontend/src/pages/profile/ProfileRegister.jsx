import { memo, useRef, useContext, useState } from 'react';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import styles from './ProfileRegister.module.css';
import FileInput from '../../components/Input/ImageFileInput';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/api';

const ProfileRegister = memo(() => {
  const navigate = useNavigate();
  const formRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const areaRef = useRef();
  const [imgURL, setImgURL] = useState(null);
  const [profileImgURL, setProfileImgURL] = useState(null);
  const [state, dispatch] = useContext(Context);

  const reader = new FileReader();

  const onFileChange = async (e) => {
    reader.onload = (e) => {
      setImgURL(e.currentTarget.result);
    };
    const imgFile = e.target.files[0];
    reader.readAsDataURL(imgFile);

    const formData = new FormData();
    formData.append('img', e.target.files[0]);

    const response = await fetch(
      'http://localhost:4000/api/auth/profile-image',
      {
        method: 'POST',
        body: formData,
      }
    );
    const blobImg = await response.blob();
    const url = URL.createObjectURL(blobImg);

    setProfileImgURL(url);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { value: nickname } = nameRef.current;
    const { value: gender } = genderRef.current;
    const { value: birthYear } = ageRef.current;
    const { value: area } = areaRef.current;

    const data = {
      profileImgURL,
      nickname,
      gender,
      birthYear,
      area,
    };

    const response = await apiClient.post(
      `/api/auth/${state.user._id}/profile`,
      data
    );

    dispatch({
      type: CHANGE_USER_INFO,
      payload: response.data,
    });
    localStorage.setItem('loginUser', JSON.stringify(response.data));
    navigate('/');
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          <h2 className={styles.title}>
            처음 오셨군요? 기본 정보를 입력해주세요!
          </h2>
          <FileInput onFileChange={onFileChange} imgURL={imgURL} />
          <Input
            ref={nameRef}
            name='nickname'
            placeholder='닉네임'
            className={styles.input}
            required
          />
          <Dropdown
            ref={genderRef}
            className={styles.input}
            type='gender'
            width='50rem'
            height='6rem'
            required
          />
          <Input
            ref={ageRef}
            name='birthyear'
            placeholder='태어난 연도'
            type='number'
            required
          />
          <Input
            ref={areaRef}
            name='area'
            placeholder='동 · 읍 · 면을 입력해주세요.'
            required
          />
          <Button text='등록하기' />
        </form>
      </div>
    </>
  );
});

export default ProfileRegister;
