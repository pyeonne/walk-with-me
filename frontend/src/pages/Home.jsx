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
  const [posts, setPost] = useState([]);
  const dropstyle = ['status', 'category', 'age', 'gender'];
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
            {dropstyle.map((style, idx) => {
              return <Dropdown key={`drop${style}_${idx}`} type={style} />;
            })}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'repeat(2, 1fr)',
              gridTemplateColumns: 'repeat(4, 1fr)',
            }}
          >
            {posts.map((post, idx) => {
              if (!idx)
                return (
                  <Link to='/' style={{ textDecoration: 'none' }}>
                    <Card
                      key={`create_post_${idx}`}
                      cardType='create'
                      style={{ margin: '1rem' }}
                    />
                  </Link>
                );
              if (idx < 8)
                return (
                  <Link
                    to='/'
                    style={{
                      textDecoration: 'none',
                      // color: 'var(--text-color)',
                      color: 'black',
                    }}
                  >
                    <Card
                      key={`recruit_post_${idx}`}
                      post={post}
                      cardType='recruit'
                      style={{ margin: '1rem' }}
                    />
                  </Link>
                );
            })}
          </div>
          <Pagination />
        </div>
      </Wrapper>
    </div>
  );
};

export default Home;
