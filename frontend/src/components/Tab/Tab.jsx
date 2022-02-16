import React, { useEffect, useState } from 'react';
import styles from './Tab.module.css';
import { useNavigate } from 'react-router-dom';

const Tab = ({ currTab, post, user, postId }) => {
  const [type, setType] = useState(null);
  const leaderTab = ['소개', '채팅방', '회원 관리'];
  const memberTab = ['소개', '채팅방'];
  let tabs;
  const navigate = useNavigate();

  const handleClickTab = (tab) => {
    switch (tab) {
      case '소개':
        navigate(`/${postId}`);
        break;
      case '채팅방':
        navigate(`/${postId}/chatting`);
        break;
      case '회원 관리':
        navigate(`/${postId}/management`);
        break;
    }
  };

  const getType = () => {
    if (post.author._id === user?._id) return 'leader';

    const memberIds = post.members.map((member) => member._id);
    if (memberIds.indexOf(user?._id) !== -1) return 'member';
    return 'visitor';
  };

  useEffect(() => {
    setType(getType());
  }, []);

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
            onClick={type === 'visitor' ? () => {} : () => handleClickTab(tab)}
          >
            {tab}
          </span>
        );
      })}
    </div>
  );
};

export default Tab;
