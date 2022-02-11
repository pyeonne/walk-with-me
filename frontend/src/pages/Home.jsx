import { useState, useEffect, useContext } from 'react';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper/Wrapper';
import Header from '../components/Header/Header';
import axios from 'axios';
import Card from '../components/Card/Card';
import Dropdown from '../components/Dropdown/Dropdown';
import styles from './Home.module.css';

import Pagination from '../components/Pagination/Pagination';
import { ADD_POSTS, CHANGE_USER_INFO } from '../context/actionTypes';

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const dropstyle = ['status', 'category', 'age'];
  const [filter, setFilter] = useState('');
  const [status, setStatus] = useState('ing');
  const [category, setCategory] = useState('');
  const [age, setAge] = useState('');

  const getPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/posts');
      dispatch({ type: ADD_POSTS, payload: response.data });
    } catch (err) {
      alert('게시물 불러오기에 실패했습니다.');
    }
  };

  useEffect(() => {
    getPosts();
  }, []);

  const changeHandler = async (e) => {
    const type = e.currentTarget.dataset['type'];
    const { value } = e.currentTarget;
    // ?status=${}&category=${}&age=${}
    if (type === 'status') setStatus(value);
    if (type === 'category') setCategory(value);
    if (type === 'age') setAge(value);
    console.log(status);
    console.log(category);
    setFilter(() => {
      `?status=${status}${category !== '' ? `&category=${category}` : ''}${
        age !== '' ? `&age=${age}` : ''
      }`;
    });

    // if (type === 'status')
    //   setFilter((prevFilter) => (prevFilter += `status=${value}`));
    // if (type === 'category' && value !== '')
    //   setFilter(
    //     (prevFilter) =>
    //       (prevFilter += `${prevFilter.length > 1 ? '&' : ''}category=${value}`)
    //   );
    // if (type === 'age' && value !== '')
    //   setFilter(
    //     (prevFilter) =>
    //       (prevFilter += `${prevFilter.length > 1 ? '&' : ''}age=${value}`)
    //   );

    const response = await axios.get(
      `http://localhost:4000/api/posts${filter}`
    );

    dispatch({ type: ADD_POSTS, payload: response.data });
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.filter}>
          {dropstyle.map((style, idx) => (
            <Dropdown key={idx} type={style} onChange={changeHandler} />
          ))}
        </div>
        <div className={styles['card-wrapper']}>
          <Link to='/RecruitRegister'>
            <Card cardType='create' />
          </Link>
          {state.posts.map((post, idx) => (
            <Link to={post._id} key={idx}>
              <Card post={post} cardType='recruit' />
            </Link>
          ))}
        </div>
      </div>
      <Pagination currPage={1} pageCount={5} />
    </>
  );
};

export default Home;
