import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header/Header';
import { apiClient } from '../api/api';
import Card from '../components/Card/Card';
import Dropdown from '../components/Dropdown/Dropdown';
import styles from './Home.module.css';
import { v4 as uuidv4 } from 'uuid';
import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const [postsObj, setPostsObj] = useState({
    posts: [],
    count: 0,
  });
  const [status, setStatus] = useState('true');
  const [category, setCategory] = useState('');
  const [age, setAge] = useState('');
  const [currPage, setCurrPage] = useState(0);

  const getPosts = async (filter) => {
    const response = await apiClient.get(`/api/posts${filter}`);
    const { posts, count } = response.data;
    setPostsObj({
      posts,
      count,
    });
  };

  useEffect(() => {
    let abortController = new AbortController();
    const filter = `?isRecruiting=${status}&category=${category}&age=${age}&page=${
      currPage + 1
    }`;

    getPosts(filter);

    return () => {
      abortController.abort();
    };
  }, [status, category, age, currPage]);

  const onClickPage = (page) => {
    setCurrPage(page);
  };

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
          {postsObj.posts.map((post) => (
            <React.Fragment key={uuidv4()}>
              <Link to={post._id}>
                <Card post={post} cardType='recruit' />
              </Link>
            </React.Fragment>
          ))}
        </div>
      </div>
      <Pagination
        currPage={currPage}
        pageCount={Math.floor(postsObj.count / 7) + 1}
        onClickPage={onClickPage}
      />
    </>
  );
};

export default Home;
