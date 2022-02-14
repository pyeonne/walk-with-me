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

  const post = state.post;
  const loading = post === null;

  const udmenuClick = () => {
    setModalOnoff(!modalOnOff);
  };
  const recruitModify = () => {
    navigate('/');
  };

  const recruitDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      try {
        await axios.delete('http://localhost:4000/api/posts/' + postId);
        alert('삭제 되었습니다');
        navigate('/');
      } catch (err) {
        console.log(err);
      }
    }
    return;
  };

  const getPost = async () => {
    try {
      const response = await axios.get(
        'http://localhost:4000/api/posts/' + postId
      );

      dispatch({
        type: NOW_POST,
        payload: response.data,
      });
    } catch (err) {
      console.log(err);
    }
  };

  const getType = () => {
    if (state.user !== null) {
      if (post.author._id === state.user._id) return 'leader';
      if (post.members.indexOf(state.user._id) !== -1) return 'member';
    }
    return 'visitor';
  };

  const handleClickTab = (tab) => {
    setCurrTab(tab);
    switch (tab) {
      case '소개':
        navigate('/');
        break;
      case '채팅방':
        navigate(`/${post._id}/chatting`);
        break;
      case '회원 관리':
        navigate(`/${post._id}/management`);
        break;
    }
  };

  useEffect(() => {
    getPost();
  }, []);

  if (loading) {
    return <div>로딩 중</div>;
  }

  return (
    <div>
      <Header
        isLoggedIn={state.user !== null}
        src={state.user !== null ? state.user.profileImagePath : null}
      />
      <div className={styles['content-container']}>
        <Tab
          currTab={currTab}
          onClick={getType() === 'visitor' ? () => {} : handleClickTab}
          type={getType()}
        />
        <div className={styles['img-card-container']}>
          <img
            className={styles['recruit-image']}
            src='https://cdn.pixabay.com/photo/2020/04/22/10/14/running-5077128_960_720.jpg'
          />
          <Card
            cardType='detail'
            style={{ width: '28rem', height: '46rem' }}
            post={post}
          />
        </div>
        <div className={styles['title-menu-container']}>
          <div className={styles['recruit-title']}>{post.title}</div>

          {state.user === null
            ? null
            : post.author._id === state.user._id && (
                <button
                  className={styles['recruit-menu-button']}
                  onClick={udmenuClick}
                >
                  <img src={udmenu} />
                </button>
              )}
        </div>
        <div>
          <div className={styles['author-date-container']}>
            <Avartar
              src={post.author.profileImagePath}
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
