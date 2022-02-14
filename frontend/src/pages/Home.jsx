import React, { useState, useEffect, useContext } from 'react';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import axios from 'axios';
import Card from '../components/Card/Card';
import Dropdown from '../components/Dropdown/Dropdown';
import styles from './Home.module.css';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '../components/Pagination/Pagination';
import { ADD_POSTS } from '../context/actionTypes';

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const [status, setStatus] = useState('ing');
  const [category, setCategory] = useState('');
  const [age, setAge] = useState('');

  const getPosts = async (filter) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/posts${filter}`
      );
      dispatch({ type: ADD_POSTS, payload: response.data });
    } catch (err) {
      alert('게시물 불러오기에 실패했습니다.');
    }
  };

  useEffect(() => {
    const filter =
      `${
        status === 'ing' ? `?isRecruiting=${true}` : `?isRecruiting=${false}`
      }` +
      `${category !== '' ? `&category=${category}` : ''}` +
      `${age !== '' ? `&age=${age}` : ''}`;
    getPosts(filter);
  }, [status, category, age]);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.filter}>
          <Dropdown
            type={'status'}
            onChange={(e) => setStatus(e.currentTarget.value)}
          />
          <Dropdown
            type={'category'}
            onChange={(e) => setCategory(e.currentTarget.value)}
          />
          <Dropdown
            type={'age'}
            onChange={(e) => setAge(e.currentTarget.value)}
          />
        </div>
        <div className={styles['card-wrapper']}>
          <Link to='/recruit-register'>
            <Card cardType='create' />
          </Link>
          {state.posts.map((post) => (
            <React.Fragment key={uuidv4()}>
              <Link to={post._id}>
                <Card post={post} cardType='recruit' />
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
      {/* <Pagination pageCount={Math.floor(state.posts.length / 8) + 1} /> */}
      <Pagination pageCount={10} />
    </>
  );
};

export default Home;
