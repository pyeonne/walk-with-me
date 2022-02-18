import Header from '../../components/Header/Header';
import Input from '../../components/Input/Input';
import Dropdown from '../../components/Dropdown/Dropdown';
import Button from '../../components/Button/Button';
import styles from './RecruitRegister.module.css';
import AddressModal from '../../components/Modal/AddressModal';
import { Context } from '../../context';
import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { apiClient } from '../../api/api';

const RecruitEdit = () => {
  const navigate = useNavigate();
  const [area, setArea] = useState('');
  const [category, SetCategory] = useState('');
  const [age, setAge] = useState('');
  const [title, setTitle] = useState('');
  const [content, SetContent] = useState('');
  const [image, setImage] = useState('');
  const [postImgURL, setPostImgURL] = useState('');
  const [imageName, setImageName] = useState('');
  const [state, dispatch] = useContext(Context);
  const [isOpen, setIsOpen] = useState(false);
  const postId = useParams().postId;
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    const response = await apiClient.get(`/api/posts/${postId}`);
    const { area, category, age, title, content, postImagePath } =
      response.data;

    setImage(postImagePath);
    setArea(area);
    SetCategory(category);
    setAge(age);
    setTitle(title);
    SetContent(content);
    setLoading(false);
  }, []);

  const author = state.user?._id;
  const reader = new FileReader();

  // 주소 검색
  const modalHandler = () => {
    setIsOpen((curr) => !curr);
  };

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
  }, [isOpen]);

  const handleComplete = (data) => {
    // bname = 법정동/법정리 이름
    // bname1 = 법정리의 읍/면 이름
    if (data.bname1 === '') setArea(data.bname);
    else setArea(data.bname1);
  };

  const onImageHandler = async (event) => {
    // 이미지 미리보기
    reader.onload = (event) => {
      setImage(event.currentTarget.result);
    };
    const imgFile = event.target.files[0];
    //readAsDataURL() 는 바이너리 파일을 읽어 들일 때 사용
    reader.readAsDataURL(imgFile);

    // 인풋창에 이미지 이름표시
    setImageName(event.currentTarget.files[0].name);

    const formData = new FormData();
    formData.append('img', event.target.files[0]);

    const response = await apiClient.post('/api/image', formData);
    setPostImgURL(response.data);
  };

  const onCategoryHandler = (event) => {
    SetCategory(event.currentTarget.value);
  };

  const onAgeHandler = (event) => {
    setAge(event.currentTarget.value);
  };

  const onTitleHandler = (event) => {
    setTitle(event.currentTarget.value);
  };

  const onContentHandler = (event) => {
    SetContent(event.currentTarget.value);
  };

  const onCancelHandler = () => {
    navigate(`/${postId}`);
  };

  const apiCall = async () => {
    try {
      await apiClient.put(`/api/posts/${postId}`, {
        postImgURL,
        author,
        area,
        category,
        age,
        title,
        content,
      });
      alert('모임 수정이 완료되었습니다!');
      navigate(`/${postId}`);
    } catch (err) {
      alert('모임 수정에 실패했습니다.');
    }
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (!area) {
      alert('지역 필수');
      return;
    }
    apiCall();
  };

  if (loading) {
    return <div>로딩 중</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <article className={styles.content}>
          <div className={styles['title-area']}>
            <h2>마음에 들지 않았던 부분을 수정해주세요!</h2>
          </div>
          <form method='POST' onSubmit={onSubmitHandler}>
            <div className={styles['form-group']}>
              <img
                className={styles['preview__img']}
                src={
                  image
                    ? image
                    : 'https://cdn.pixabay.com/photo/2020/04/22/10/14/running-5077128_960_720.jpg'
                }
                alt='모임 대표 사진'
              />
              <div className={styles.filebox}>
                <input
                  className={styles['file-name']}
                  type='text'
                  value={imageName}
                  placeholder='모임 대표 사진'
                  disabled
                />
                <label htmlFor='file'>업로드</label>
                <input
                  className={styles.imgInput}
                  id='file'
                  type='file'
                  accept='image/*'
                  onChange={onImageHandler}
                />
              </div>
              <div className={styles.areaBox}>
                <Input
                  name='area'
                  width='40rem'
                  placeholder='활동지역을 검색해주세요.'
                  value={area}
                  disabled
                />
                <Button
                  type='button'
                  width='9rem'
                  height='6rem'
                  ftsize='1.4rem'
                  text='검색하기'
                  onClick={modalHandler}
                />
              </div>
              <Dropdown
                type='category'
                height='6rem'
                width='100%'
                onChange={onCategoryHandler}
                value={category}
                required={true}
              />
              <Dropdown
                type='age'
                height='6rem'
                width='100%'
                onChange={onAgeHandler}
                value={age}
                required={true}
              />
              <Input
                name='title'
                width='100%'
                marginBottom='1rem'
                placeholder='모임 이름을 입력해주세요.'
                value={title}
                onChange={onTitleHandler}
                required={true}
              />
              <Input
                name='content'
                width='100%'
                placeholder='모임 목표를 설명해주세요.'
                marginBottom='1rem'
                minLength={0}
                maxLength={500}
                value={content}
                onChange={onContentHandler}
                required
              />
              <div className={styles['btn-group']}>
                <Button
                  type='button'
                  text='취소'
                  width='18.2rem'
                  bg='#cccccc'
                  onClick={onCancelHandler}
                />
                <Button type='submit' text='수정하기' width='18.2rem' />
              </div>
            </div>
          </form>
        </article>
      </div>
      {isOpen && (
        <AddressModal
          onClick={modalHandler}
          onComplete={handleComplete}
          onClose={modalHandler}
        />
      )}
    </>
  );
};

export default RecruitEdit;
