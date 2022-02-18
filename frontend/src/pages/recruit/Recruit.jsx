import Map from '../../components/Map/Map';
import Card from '../../components/Card/Card';
import Avartar from '../../components/Avatar/Avatar';
import Tab from '../../components/Tab/Tab';
import Header from '../../components/Header/Header';
import styles from './Recruit.module.css';
import udmenu from './images/udmenu.svg';
import udmenuDark from './images/udmenuDark.svg';
import { useState, useEffect, useContext, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Context } from '../../context';
import { NOW_POST } from '../../context/actionTypes';
import { apiClient } from '../../api/api';

const currTab = '소개';

const Recruit = () => {
  const [state, dispatch] = useContext(Context);
  const { user, post } = state;
  const { id: postId } = useParams();

  const navigate = useNavigate();
  const modalRef = useRef();
  const [modalOnOff, setModalOnoff] = useState(false);
  const [recruit, setRecruit] = useState();
  const [loading, setLoading] = useState(true);

  const getPost = async () => {
    const response = await apiClient.get('/api/posts/' + postId);

    dispatch({
      type: NOW_POST,
      payload: response.data,
    });

    setLoading(false);
  };

  const udmenuClick = () => {
    setRecruit(post.isRecruiting);
    setModalOnoff(!modalOnOff);
  };

  const handleCloseModal = (event) => {
    if (modalOnOff || !modalRef.current.contains(event.target)) {
      setModalOnoff(false);
      console.log('click');
    }
    return;
  };

  const recruitModify = () => {
    navigate(`/recruit-edit/${postId}`);
  };

  const recruitDelete = async () => {
    if (confirm('정말 삭제하시겠습니까?')) {
      await apiClient.delete('/api/posts/' + postId);
      alert('삭제 되었습니다');
      navigate('/');
    }
    return;
  };
  /* 모집 상태
  PUT /api/posts/:id/status
  */
  const recruitDone = async () => {
    await apiClient.put(`api/posts/${postId}/status`);

    getPost();
  };

  useEffect(() => {
    getPost();

    return () => {
      dispatch({
        type: NOW_POST,
        payload: null,
      });
    };
  }, []);

  useEffect(() => {
    if (modalOnOff) {
      window.addEventListener('click', handleCloseModal);

      return () => {
        window.removeEventListener('click', handleCloseModal);
      };
    }
  }, [modalOnOff]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header
        isLoggedIn={state.user !== null}
        src={state.user !== null ? state.user.profileImagePath : null}
      />

      <div className={styles['content-container']}>
        <Tab currTab={currTab} postId={post._id} post={post} user={user} />
        <div className={styles.content}>
          <div className={styles.left}>
            <div className={styles['img-card-container']}>
              <img className={styles['recruit-image']} src={post.postImgURL} />
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
                      <img src={state.darkMode ? udmenuDark : udmenu} />
                    </button>
                  )}
            </div>
            <div>
              <div className={styles['author-date-container']}>
                <Avartar
                  src={post.author.profileImagePath}
                  height='3rem'
                  width='3rem'
                />
                <div className={styles['recruit-author']}>
                  by {post.author.nickname}
                </div>
                <div className={styles['recruit-date']}>
                  {post.createdAt.substr(0, 10).split('-').join('.')}
                </div>
                {modalOnOff && (
                  <div
                    ref={modalRef}
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
                    <button
                      className={styles['recruit-menu-modal-done']}
                      onClick={recruitDone}
                    >
                      {recruit ? '마감하기' : '모집하기'}
                    </button>
                  </div>
                )}
              </div>
            </div>
            <div className={styles['recruit-text']}>{post.content}</div>
            <Map area={post.area} />
          </div>
          <div className={styles.right}>
            <Card
              cardType='detail'
              style={{
                width: '28rem',
                height: '46rem',
                margin: 0,
                position: 'fixed',
              }}
              post={post}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Recruit;
