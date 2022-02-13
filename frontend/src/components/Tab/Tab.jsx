import React from 'react';
import styles from './Tab.module.css';

const Tab = ({ currTab, onClick, type }) => {
  const leaderTab = ['소개', '채팅방', '회원 관리'];
  const memberTab = ['소개', '채팅방'];
  let tabs;

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
