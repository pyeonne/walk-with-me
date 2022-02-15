import React from 'react';
import styles from './Tab.module.css';
import { useNavigate } from 'react-router-dom';

const Tab = ({ currTab, onClick, type, postId }) => {
  const leaderTab = ['소개', '채팅방', '회원 관리'];
  const memberTab = ['소개', '채팅방'];
  let tabs;
  const navigate = useNavigate();

  // const handleClickTab = (tab) => {
  //   switch (tab) {
  //     case '소개':
  //       navigate('/');
  //       break;
  //     case '채팅방':
  //       navigate(`/${postId}/chatting`);
  //       break;
  //     case '회원 관리':
  //       navigate(`/${postId}/management`);
  //       break;
  //   }
  // };

  if (type === 'leader') tabs = leaderTab;
  else tabs = memberTab;

  return (
    <div className={styles.container}>
      {tabs.map((tab, i) => {
        return (
          <span
            className={type === 'visitor' ? styles.notMemeberTab : styles.tab}
            key={`${tab}-${i}`}
            active={(currTab === tab).toString()}
            onClick={() => onClick(tab)}
          >
            {tab}
          </span>
        );
      })}
    </div>
  );
};

export default Tab;
