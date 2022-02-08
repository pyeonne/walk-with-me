import React from 'react';
import styles from './Tab.module.css';

const Tab = ({ currTab, onClick }) => {
  const tabs = ['소개', '채팅방', '회원 관리'];
  return (
    <div className={styles.container}>
      {tabs.map((tab, i) => {
        return (
          <span
            className={styles.tab}
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
