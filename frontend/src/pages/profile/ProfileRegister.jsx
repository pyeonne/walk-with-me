import { memo, useRef, useContext } from 'react';
import Button from '../../components/Button/Button';
import Dropdown from '../../components/Dropdown/Dropdown';
import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import styles from './ProfileRegister.module.css';
import axios from 'axios';
import FileInput from '../../components/image_file_input/image_file_input';
import { Context } from '../../context';
import { CHANGE_USER_INFO } from '../../context/actionTypes';

const ProfileRegister = memo(() => {
  const formRef = useRef();
  const nameRef = useRef();
  const genderRef = useRef();
  const ageRef = useRef();
  const areaRef = useRef();
  const [state, dispatch] = useContext(Context);

  const onFileChange = async (e) => {
    const formData = new FormData();
    formData.append('img', e.target.files[0]);

    const response = await axios.post(
      'http://localhost:4000/api/auth/6200bb04d1edeba0b824faec/profile-image',
      formData
    );
    console.log(response);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { value: nickname } = nameRef.current;
    const { value: gender } = genderRef.current;
    const { value: age } = ageRef.current;
    const { value: area } = areaRef.current;

    if (!nickname || !gender || !age || !area) {
      alert('이미지를 제외한 항목들은 필수 항목입니다.');
      return;
    }

    const data = {
      nickname,
      gender,
      age,
      area,
    };

    const response = await axios.post(
      'http://localhost:4000/api/auth/6204aad85d19a0c564d0572b/profile',
      data
    );

    dispatch({ type: CHANGE_USER_INFO, payload: response.data });
  };
  console.log(state);

  return (
    <>
      <Header />
      <div className={styles.container}>
        <form ref={formRef} className={styles.form} onSubmit={onSubmit}>
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
