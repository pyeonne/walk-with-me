import React from 'react';
import styles from './Tab.module.css';

const Tab = ({ currTab, onClick, type }) => {
  const leaderTab = ['소개', '채팅방', '회원 관리'];
  const memberTab = ['소개', '채팅방'];
  let tab;

  if (type === 'leader') tab = leaderTab;
  else tab = memberTab;

  return (
    <div className={styles.container}>
      {tab.map((tab, i) => {
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
