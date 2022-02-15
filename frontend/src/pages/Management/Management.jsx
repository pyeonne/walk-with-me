import React, { useState, useEffect, useContext } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';
import styles from './Management.module.css';
import { Context } from '../../context';
import { apiClient } from '../../api/api';
import { useNavigate, useParams } from 'react-router-dom';

const Manager = ({ content }) => {
  const navigate = useNavigate();
  const [state, dispatch] = useContext(Context);
  const user = state.user;
  const postId = useParams().postId;
  const [currTab, setCurrTab] = useState('회원 관리');
  const [preMembers, setPreMembers] = useState([]);
  const [members, setMembers] = useState([]);
  const [id, setId] = useState();

  const handleClickTab = (tab) => {
    setCurrTab(tab);
  };
  console.log(postId);
  useEffect(() => {
    apiClient
      .get(`/api/posts/${postId}/management`)
      .then((response) => {
        console.log(response.data);
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
  const allowMember = (id) => {
    apiClient
      .post(`/api/posts/${postId}/management/${id}/allow`)
      .then((response) => {
        console.log(response.data);
        setPreMembers(response.data.preMember);
        setMembers(response.data.members);
      });
  };

  /* 회원 관리 거절
  POST /api/posts/:id/management/:userId/deny
  */
  const rejectMember = (id) => {
    apiClient
      .delete(`/api/posts/${postId}/management/${id}/deny`)
      .then((response) => {
        setPreMembers(response.data.preMember);
      });
  };

  /* 회원 관리 퇴출
  DELETE /api/posts/:id/management/:userId/kick */
  const deleteMember = (id) => {
    apiClient
      .delete(`/api/posts/${postId}/management/${id}/kick`)
      .then((response) => {
        console.log(response.data);

        setMembers(response.data.members);
      });
  };
  return (
    <>
      <Header />
      <div className={styles.container}>
        <Tab currTab={currTab} onClick={handleClickTab} type={'leader'} />
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
                        width='6rem'
                        height='4rem'
                        radius='2rem'
                        ftsize='1.3rem'
                        bg='var(--box-color)'
                        color='var(--text-color-light)'
                        onClick={() => rejectMember(preMembers[key]._id)}
                      />
                    </td>
                    <td data-id={preMembers[key]._id}>
                      <Button
                        text='승인'
                        width='6rem'
                        height='4rem'
                        radius='2rem'
                        ftsize='1.3rem'
                        color='var(--text-color-light)'
                        onClick={() => allowMember(preMembers[key]._id)}
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
                  <td></td>
                  <td data-id={members[key].nickname}>
                    <Button
                      text='퇴출'
                      width='6rem'
                      height='4rem'
                      radius='2rem'
                      ftsize='1.3rem'
                      color='var(--text-color-light)'
                      onClick={() => deleteMember(preMembers[key]._id)}
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
