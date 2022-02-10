import React, { useState, useEffect } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';
import styles from './Manager.module.css';
import axios from 'axios';

const Manager = ({ content }) => {
  const [currTab, setCurrTab] = useState('회원관리');
  const [preMembers, setPreMembers] = useState([]);
  const [id, setId] = useState();
  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };
  useEffect(() => {
    axios
      .get(
        'http://localhost:4000/api/posts/6204aaff5d19a0c564d05730/management'
      )
      .then((response) => {
        setId(response.data._id);
        setPreMembers(response.data.preMembers);
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        // 항상 실행
      });
  }, []);
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Tab currTab={currTab} onClick={handleClickTab} />
        <div className={styles.list}>
          <h2>가입 신청</h2>
          <table border='1'>
            <thead>
              <tr>
                <th></th>
                <th>닉네임</th>
                <th>성별</th>
                <th>지역</th>
                <th>나이</th>
                <th>소개말</th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(preMembers).map((key) => (
                <tr key={key}>
                  <td>
                    <Avatar />
                  </td>
                  <td>{preMembers[key].nickname}</td>
                  <td>{preMembers[key].gender}</td>
                  <td>{preMembers[key].area}</td>
                  <td>{preMembers[key].birthYear}</td>
                  <td>
                    {
                      preMembers[key].applyPosts.find((bio) => bio._id === id)
                        .bio
                    }
                  </td>
                  <td>
                    <Button
                      text='거절'
                      width='5rem'
                      height='3rem'
                      radius='2rem'
                      ftsize='1.3rem'
                      bg='var(--box-color)'
                      color='var(--text-color-light)'
                    />
                  </td>
                  <td>
                    <Button
                      text='승인'
                      width='5rem'
                      height='3rem'
                      radius='2rem'
                      ftsize='1.3rem'
                      color='var(--text-color-light)'
                    />
                  </td>
                </tr>
              ))}
            </tbody>
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
              <th></th>
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
              <td>
                <Button
                  text='퇴출'
                  width='5rem'
                  height='3rem'
                  radius='2rem'
                  ftsize='1.3rem'
                  bg='var(--box-color)'
                  color='var(--text-color-light)'
                />
              </td>
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
              <td>
                <Button
                  text='퇴출'
                  width='5rem'
                  height='3rem'
                  radius='2rem'
                  ftsize='1.3rem'
                  bg='var(--box-color)'
                  color='var(--text-color-light)'
                />
              </td>
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
              <td>
                <Button
                  text='퇴출'
                  width='5rem'
                  height='3rem'
                  radius='2rem'
                  ftsize='1.3rem'
                  bg='var(--box-color)'
                  color='var(--text-color-light)'
                />
              </td>
            </tr>
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
