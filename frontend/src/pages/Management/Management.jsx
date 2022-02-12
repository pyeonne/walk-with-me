import React, { useState, useEffect } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';
import styles from './Management.module.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const Manager = ({ content }) => {
  const [currTab, setCurrTab] = useState('회원관리');
  const [preMembers, setPreMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [id, setId] = useState();
  console.log(preMembers);

  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };
  // const { id } = useParams();

  useEffect(() => {
    axios
      .get(
        `http://localhost:4000/api/posts/6204aaff5d19a0c564d05730/management`
      )
      .then((response) => {
        setId(response.data.preMembers[0].applyPosts[0]._id);
        setPreMembers(response.data.preMembers);
        setMembers(response.data.members);
      })
      .catch((error) => {
        // 오류발생시 실행
      })
      .then(() => {
        // 항상 실행
      });
  }, []);

  /* 회원 관리 수락
  POST /api/posts/:id/management/:userId/allow
  */
  const allowMember = (event) => {
    axios
      .post(
        `http://localhost:4000/api/posts/6204aaff5d19a0c564d05730/management/6204aad85d19a0c564d0572b/allow`
      )
      .then((response) => {
        console.log(response.data);
        setPreMembers(response.data.preMember);
        setMembers(response.data.members);
      });
  };

  /* 회원 관리 거절
  POST /api/posts/:id/management/:userId/deny
  */
  const rejectMember = () => {
    axios
      .delete(
        `http://localhost:4000/api/posts/6204aaff5d19a0c564d05730/management/6204aad85d19a0c564d0572b/deny`
      )
      .then((response) => {
        setPreMembers(response.data.preMember);
      });
  };

  /* 회원 관리 퇴출
  DELETE /api/posts/:id/management/:userId/kick */
  const deleteMember = () => {
    axios
      .delete(
        `http://localhost:4000/api/posts/6204aaff5d19a0c564d05730/management/6204aad85d19a0c564d0572b/kick`
      )
      .then((response) => {
        console.log(response.data);

        setMembers(response.data.members);
      });
  };
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
              {preMembers &&
                Object.keys(preMembers).map((key) => (
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
                        onClick={rejectMember}
                      />
                    </td>
                    <td data-id={preMembers[key]._id}>
                      <Button
                        text='승인'
                        width='5rem'
                        height='3rem'
                        radius='2rem'
                        ftsize='1.3rem'
                        color='var(--text-color-light)'
                        onClick={allowMember}
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
            {members &&
              Object.keys(members).map((key) => (
                <tr key={key}>
                  <td>
                    <Avatar />
                  </td>
                  <td>{members[key].nickname}</td>
                  <td>{members[key].gender}</td>
                  <td>{members[key].area}</td>
                  <td>{members[key].birthYear}</td>
                  <td>{members[key].nickname}</td>

                  <td data-id={members[key].nickname}>
                    <Button
                      text='퇴출'
                      width='5rem'
                      height='3rem'
                      radius='2rem'
                      ftsize='1.3rem'
                      color='var(--text-color-light)'
                      onClick={deleteMember}
                    />
                  </td>
                </tr>
              ))}
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
