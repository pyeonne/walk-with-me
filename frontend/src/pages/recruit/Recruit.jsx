import Map from '../../components/Map/Map';
import Card from '../../components/Card/Card';
import Avartar from '../../components/Avatar/Avatar';
import Tab from '../../components/Tab/Tab';
import Header from '../../components/Header/Header';

import styles from './Recruit.module.css';
import udmenu from './images/udmenu.svg';
import { useState, useEffect, useContext } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../context';
import { NOW_POST } from '../../context/actionTypes';
import axios from 'axios';

const Recruit = () => {
  const [state, dispatch] = useContext(Context);
  const postId = useParams().postId;

  const navigate = useNavigate();
  let [currTab, setCurrTab] = useState('소개');
  let [modalOnOff, setModalOnoff] = useState(false);

  const handleClickTab = (tab) => {
    setCurrTab(tab);
    switch (tab) {
      case '소개':
        navigate('/');
        break;
      case '채팅방':
        navigate('/signin');
        break;
      case '회원 관리':
        navigate('/password-find');
        break;
    }
  };

  const udmenuClick = () => {
    setModalOnoff(!modalOnOff);
  };

  const recruitModify = () => {
    navigate('/');
  };

  const recruitDelete = () => {
    navigate('/');
  };

  const getPost = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/posts/' + postId
      );
      console.log(response.data);

      dispatch({
        type: NOW_POST,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPost();
  }, []);
  console.log(state);
  // console.log(state.user);

  // state.user._id
  const loading = state.post === null;
  const post = state.post;
  if (loading) {
    return <div>로딩 중</div>;
  }

  return (
    <div>
      <Header />
      <div className={styles['content-container']}>
        <Tab currTab={currTab} onClick={handleClickTab} />
        <div className={styles['img-card-container']}>
          <img
            className={styles['recruit-image']}
            src='https://cdn.pixabay.com/photo/2020/04/22/10/14/running-5077128_960_720.jpg'
          />
          <Card
            cardType='detail-card'
            style={{ width: '28rem', height: '45.5rem' }}
          />
        </div>
        <div className={styles['title-menu-container']}>
          <div className={styles['recruit-title']}>{post.title}</div>

          {state.user === null
            ? null
            : post.author._id === state.user._id && (
                <img
                  className={styles['recruit-menu-button']}
                  src={udmenu}
                  onClick={udmenuClick}
                />
              )}
        </div>
        <div>
          <div className={styles['author-date-container']}>
            <Avartar
              className={styles['recruit-profile']}
              height='2.4rem'
              width='2.4rem'
            />
            <div className={styles['recruit-author']}>
              by
              {post.author.nickname}
            </div>
            <div className={styles['recruit-date']}>
              {post.createdAt.substr(0, 10).split('-').join('.')}
            </div>
            <div
              className={styles['recruit-menu-modal']}
              style={{ display: `${modalOnOff ? 'flex' : 'none'}` }}
            >
              <button
                className={styles['recruit-menu-modal-modify']}
                onClick={recruitModify}
              >
                수정하기
              </button>
              <button
                className={styles['recruit-menu-modal-delete']}
                onClick={recruitDelete}
              >
                삭제하기
              </button>
            </div>
          </div>
        </div>
        <div className={styles['recruit-text']}>{post.content}</div>

        <Map area={post.area} />
      </div>
    </div>
  );
};

export default Recruit;

// post:
// age: 20
// area: "매탄동"
// author:
// applyPosts: [{…}]
// area: "매탄동"
// birthYear: 1994
// email: "ansrud45@gmail.com"
// gender: "남"
// joinedPosts: []
// likePosts: []
// nickname: "뽀꼬로꼬"
// password: "7110eda4d09e062aa5e4a390b0a572ac0d2c0220"
// profileImagePath: "/Users/dinomoon/dev/walk-with-me/backend/uploads/1644541567604.png"
// __v: 0
// _id: "6204aad85d19a0c564d0572b"
// [[Prototype]]: Object
// category: "walk"
// content: "content"
// createdAt: "2022-02-10T06:04:47.314Z"
// isRecruiting: true
// likeMembers: []
// members: []
// preMembers: ['6204aad85d19a0c564d0572b']
// title: "testTitle"
// updatedAt: "2022-02-10T06:05:11.069Z"
// __v: 0
// _id: "6204aaff5d19a0c564d05730"
// [[Prototype]]: Object
// posts: []
// user: null
// [[Prototype]]: Object
