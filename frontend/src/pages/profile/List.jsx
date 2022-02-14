import React, { useState, useEffect, useContext } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import { Context } from '../../context';
import Header from '../../components/Header/Header';
import Arrow from './icons/Arrow';
import Explore from './icons/explore';
import Face from './icons/Face';
import styles from './profile.module.css';
import Calendar from './icons/Calendar';
import { apiClient } from '../../api/api';
import { CHANGE_USER_INFO } from '../../context/actionTypes';
import { v4 as uuidv4 } from 'uuid';

const List = (props) => {
  const { type, posts } = props;
  if (!posts) return <>로딩중</>;
  return (
    <div className={`${styles.lists} ${true && styles.open}`}>
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
    </div>
  );
};

export default List;
