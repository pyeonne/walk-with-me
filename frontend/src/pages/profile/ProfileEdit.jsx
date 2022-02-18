import { memo, useRef, useContext, useState, useEffect } from 'react';
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

const ProfileEdit = memo(() => {
  const navigate = useNavigate();
  const formRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const areaRef = useRef();
  const [imgURL, setImgURL] = useState(null);
  const [profileImgURL, setProfileImgURL] = useState(null);
  const [state, dispatch] = useContext(Context);
  let { user } = state;
  if (!user) {
    user = JSON.parse(localStorage.getItem('loginUser'));
  }

  const reader = new FileReader();
  const {
    _id: userId,
    nickname,
    gender,
    birthYear,
    area,
    profileImgURL: preProfileImgURL,
  } = user;

  useEffect(async () => {
    nameRef.current.value = nickname;
    genderRef.current.value = gender;
    ageRef.current.value = birthYear;
    areaRef.current.value = area;
    setImgURL(preProfileImgURL);
  }, []);

  const onFileChange = async (e) => {
    reader.onload = (e) => {
      setImgURL(e.currentTarget.result);
    };
    const imgFile = e.target.files[0];
    reader.readAsDataURL(imgFile);

    const formData = new FormData();
    formData.append('img', e.target.files[0]);

    const response = await apiClient.post('/api/image', formData);
    setProfileImgURL(response.data);
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

    const response = await apiClient.post(`/api/auth/${userId}/profile`, data);

    dispatch({ type: CHANGE_USER_INFO, payload: response.data });
    localStorage.setItem('loginUser', JSON.stringify(response.data));
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
