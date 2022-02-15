import React from 'react';
import styles from './profile.module.css';
import Calendar from './icons/Calendar';
import { v4 as uuidv4 } from 'uuid';

const List = (props) => {
  const { type, user } = props;
  const posts = user[type];

  if (typeof posts[0] === 'string') {
    return <h1>Loading...</h1>;
  }

  return (
    <>
      {posts.map((post) => {
        return (
          <div key={uuidv4()} className={styles.article}>
            <div className={styles.img}>
              <img src={post.image} alt='' />
            </div>
            <div className={styles.summary}>
              <h3>{post.title}</h3>
              <div className={styles.tags}>
                {[`#${post.area}`, `#${post.age}대`, `#${post.category}`].map(
                  (tag) => {
                    return (
                      <p key={uuidv4()} className={styles.tag}>
                        {tag}
                      </p>
                    );
                  }
                )}
              </div>
              <div className={styles.count}>
                <Calendar />
                <p>{post.members.length}명</p>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
