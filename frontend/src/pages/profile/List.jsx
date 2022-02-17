import React from 'react';
import styles from './profile.module.css';
import Calendar from './icons/Calendar';
import { v4 as uuidv4 } from 'uuid';
import { Link } from 'react-router-dom';

const List = (props) => {
  const { type, user } = props;
  const posts = user[type];

  return (
    <>
      {posts.map((post) => (
        <Link to={`/${post._id}`} key={uuidv4()} className={styles.article}>
          <div className={styles.img}>
            <img src={post.image} alt='' />
          </div>
          <div className={styles.summary}>
            <h3>{post.title}</h3>
            <div className={styles.tags}>
              {[`#${post.area}`, `#${post.age}대`, `#${post.category}`].map(
                (tag) => (
                  <p key={uuidv4()} className={styles.tag}>
                    {tag}
                  </p>
                )
              )}
            </div>
            <div className={styles.count}>
              <Calendar />
              <p>{post.members.length + 1}명</p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
};

export default List;
