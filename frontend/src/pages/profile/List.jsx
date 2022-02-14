import React from 'react';
import styles from './profile.module.css';
import Calendar from './icons/Calendar';
import { v4 as uuidv4 } from 'uuid';

const List = (props) => {
  const { type, user } = props;
  let posts = user[type];
  if (posts === null || posts === undefined || posts === [])
    posts = [{ area: '', age: '', category: '', title: '', members: [] }];
  console.log('props.posts: ', posts[0]);
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
                {/* <p>{post.members.length}명</p> */}
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default List;
