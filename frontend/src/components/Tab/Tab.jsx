import React from 'react';
import styles from './tab.module.css';

const Tab = ({ currTab, onClick }) => {
  const tabs = ['소개', '채팅방', '회원 관리'];
  return (
    <div className={styles.container}>
      {tabs.map((tab, i) => {
        return (
          <p
            key={`${tab}-${i}`}
            active={currTab === tab}
            onClick={() => onClick(tab)}
          >
            {tab}
          </p>
        );
      })}
    </div>
  );
};

export default Tab;
