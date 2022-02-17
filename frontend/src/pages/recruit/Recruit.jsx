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
import { apiClient } from '../../api/api';

const currTab = '소개';

const Recruit = () => {
  const [state, dispatch] = useContext(Context);
  const { id: postId } = useParams();

  const navigate = useNavigate();
  const [modalOnOff, setModalOnoff] = useState(false);
  const [loading, setLoading] = useState(true);
  const { user, post } = state;

  const udmenuClick = () => {
    setModalOnoff(!modalOnOff);
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

  const getPost = async () => {
    const response = await apiClient.get('/api/posts/' + postId);

    dispatch({
      type: NOW_POST,
      payload: response.data,
    });
    setLoading(false);
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
              height='3rem'
              width='3rem'
            />
            <div className={styles['recruit-author']}>
              by {post.author.nickname}
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
