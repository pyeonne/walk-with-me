import React, { useState } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';
import styles from './Manager.module.css';

const Manager = (props) => {
  const [currTab, setCurrTab] = useState('소개');
  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Tab currTab={currTab} onClick={handleClickTab} />
        <div className={styles.list}>
          <h2>가입 신청</h2>
          <table border='1'>
            <tr>
              <th></th>
              <th>닉네임</th>
              <th>성별</th>
              <th>지역</th>
              <th>나이</th>
              <th>소개말</th>
            </tr>
            <tr>
              <td>
                <Avatar />
              </td>
              <td>유명한</td>
              <td>여자</td>
              <td>서울특별시 무슨동</td>
              <td>1988</td>
              <td>안녕하세요. 같이 자전거 타고 싶어요~ </td>
            </tr>
            <tr>
              <td>
                <Avatar />
              </td>
              <td>유명한</td>
              <td>여자</td>
              <td>서울특별시 무슨동</td>
              <td>1988</td>
              <td>안녕하세요. 같이 자전거 타고 싶어요~ </td>
            </tr>
            <tr>
              <td>
                <Avatar />
              </td>
              <td>유명한</td>
              <td>여자</td>
              <td>서울특별시 무슨동</td>
              <td>1988</td>
              <td>안녕하세요. 같이 자전거 타고 싶어요~ </td>
            </tr>
          </table>
        </div>
        <div className={styles.list}>
          <h2>모임 회원</h2>
          <table border='1'>
            <tr>
              <th></th>
              <th>닉네임</th>
              <th>성별</th>
              <th>지역</th>
              <th>나이</th>
              <th>소개말</th>
            </tr>
            <tr>
              <td>
                <Avatar />
              </td>
              <td>유명한</td>
              <td>여자</td>
              <td>서울특별시 무슨동</td>
              <td>1988</td>
              <td>안녕하세요. 같이 자전거 타고 싶어요~ </td>
            </tr>
            <tr>
              <td>
                <Avatar />
              </td>
              <td>유명한</td>
              <td>여자</td>
              <td>서울특별시 무슨동</td>
              <td>1988</td>
              <td>안녕하세요. 같이 자전거 타고 싶어요~ </td>
            </tr>
            <tr>
              <td>
                <Avatar />
              </td>
              <td>유명한</td>
              <td>여자</td>
              <td>서울특별시 무슨동</td>
              <td>1988</td>
              <td>안녕하세요. 같이 자전거 타고 싶어요~ </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
