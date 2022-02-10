import { useState, useEffect, useContext } from 'react';
import { Context } from '../context';
import { Link } from 'react-router-dom';
import Wrapper from '../components/Wrapper/Wrapper';
import Header from '../components/Header/Header';
import axios from 'axios';
import Card from '../components/Card/Card';
import Dropdown from '../components/Dropdown/Dropdown';

import Pagination from '../components/Pagination/Pagination';

const Home = () => {
  const [state, dispatch] = useContext(Context);
  const [post, setPost] = useState([]);
  const getPosts = async () => {
    try {
      const response = await axios.get('http://localhost:4000/api/posts');
      setPost(response.data);
    } catch (err) {
      alert('게시물 불러오기에 실패했습니다.');
    }
  };
  useEffect(() => {
    getPosts();
  }, []);

  return (
    <div>
      <Header />
      <Wrapper>
        <div style={{ flexDirection: 'column' }}>
          <div
            style={{ display: 'flex', justifyContent: 'right', margin: '1rem' }}
          >
            <Dropdown type='status'></Dropdown>
            <Dropdown type='category'></Dropdown>
            <Dropdown type='age'></Dropdown>
            <Dropdown type='gender'></Dropdown>
          </div>
          <div style={{ display: 'flex' }}>
            <Link to='/'>
              <Card cardType='create' style={{ margin: '1rem' }} />
            </Link>

            <Card
              cardType='recruit'
              post={post[1]}
              style={{ margin: '1rem' }}
            />
            <Card
              cardType='recruit'
              post={post[1]}
              style={{ margin: '1rem' }}
            />
            <Card
              cardType='recruit'
              post={post[1]}
              style={{ margin: '1rem' }}
            />
          </div>
          <div style={{ display: 'flex' }}>
            <Card
              cardType='recruit'
              post={post[1]}
              style={{ margin: '1rem' }}
            />
            <Card
              cardType='recruit'
              post={post[1]}
              style={{ margin: '1rem' }}
            />
            <Card
              cardType='recruit'
              post={post[1]}
              style={{ margin: '1rem' }}
            />
            <Card
              cardType='recruit'
              post={post[1]}
              style={{ margin: '1rem' }}
            />
          </div>
          <Pagination />
        </div>
      </Wrapper>
    </div>
  );
};

export default Home;
