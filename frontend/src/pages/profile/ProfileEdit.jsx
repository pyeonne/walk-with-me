import { memo, useRef, useContext, useState, useEffect } from 'react';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import styles from './ProfileRegister.module.css';
import axios from 'axios';
import FileInput from '../../components/Input/ImageFileInput';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import { useNavigate } from 'react-router-dom';
import { apiClient } from '../../api/api';

const ProfileEdit = memo(() => {
  const navigate = useNavigate();
  const formRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const areaRef = useRef();
  const [imgURL, setImgURL] = useState(null);
  const [state, dispatch] = useContext(Context);
  const {
    _id: userId,
    nickname,
    gender,
    birthYear,
    area,
    profileImgURL,
  } = state.user;
  const IMG_REGISTER_URL = `http://localhost:4000/api/auth/${userId}/profile-image`;
  const INFO_REGISTER_URL = `/api/auth/${userId}/profile`;

  useEffect(async () => {
    nameRef.current.value = nickname;
    genderRef.current.value = gender;
    ageRef.current.value = birthYear;
    areaRef.current.value = area;
    setImgURL(profileImgURL);
  }, []);

  const onFileChange = async (e) => {
    const formData = new FormData();
    formData.append('img', e.target.files[0]);

    await axios.post(IMG_REGISTER_URL, formData);

    const response = await fetch(IMG_REGISTER_URL);
    const blobImg = await response.blob();
    const imgURL = URL.createObjectURL(blobImg);
    setImgURL(imgURL);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { value: nickname } = nameRef.current;
    const { value: gender } = genderRef.current;
    const { value: birthYear } = ageRef.current;
    const { value: area } = areaRef.current;

    const data = {
      nickname,
      gender,
      birthYear,
      area,
    };

    const response = await apiClient.put(INFO_REGISTER_URL, data);

    dispatch({ type: CHANGE_USER_INFO, payload: response.data });
    alert('수정이 완료되었습니다!');
    navigate(`/${userId}/profile`);
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
          <h2 className={styles.title}>수정할 정보를 입력해 주세요!</h2>
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
          <Button text='수정하기' />
        </form>
      </div>
    </>
  );
});

export default ProfileEdit;
