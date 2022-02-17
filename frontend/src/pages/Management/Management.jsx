import React, { useState, useEffect, useContext } from 'react';
import Avatar from '../../components/Avatar/Avatar';
import Button from '../../components/Button/Button';
import Header from '../../components/Header/Header';
import Tab from '../../components/Tab/Tab';
import styles from './Management.module.css';
import { apiClient } from '../../api/api';
import { useParams } from 'react-router-dom';
import { Context } from '../../context';
import { NOW_POST } from '../../context/actionTypes';
import { v4 as uuidv4 } from 'uuid';

const currTab = '회원 관리';

const Manager = () => {
  const [state, dispatch] = useContext(Context);
  const { id: postId } = useParams();
  const [loading, setLoading] = useState(true);
  const { user, post } = state;

  const getPost = async () => {
    const response = await apiClient.get('/api/posts/' + postId);

    dispatch({
      type: NOW_POST,
      payload: response.data,
    });
    setLoading(false);
  };

  useEffect(() => {
    getPost();

    return () => {
      dispatch({
        type: NOW_POST,
        payload: null,
      });
    };
  }, []);

  /* 회원 관리 수락
  POST /api/posts/:id/management/:userId/allow
  */
  const allowMember = async (id) => {
    const response = await apiClient.post(
      `/api/posts/${postId}/management/${id}/allow`
    );

    const { members, preMembers } = response.data;
    dispatch({
      type: NOW_POST,
      payload: { ...post, members, preMembers },
    });
  };

  /* 회원 관리 거절
  POST /api/posts/:id/management/:userId/deny
  */
  const rejectMember = async (id) => {
    const response = await apiClient.post(
      `/api/posts/${postId}/management/${id}/deny`
    );

    const { preMembers } = response.data;
    dispatch({
      type: NOW_POST,
      payload: { ...post, preMembers },
    });
  };

  /* 회원 관리 퇴출
  DELETE /api/posts/:id/management/:userId/kick */
  const deleteMember = async (id) => {
    const response = await apiClient.delete(
      `/api/posts/${postId}/management/${id}/kick`
    );

    const { members } = response.data;
    dispatch({
      type: NOW_POST,
      payload: { ...post, members },
    });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header />
      <div className={styles.container}>
        <Tab currTab={currTab} user={user} post={post} postId={postId} />
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
              {post.preMembers.map((preMember) => (
                <tr key={uuidv4()}>
                  <td>
                    <Avatar />
                  </td>
                  <td>{preMember.nickname}</td>
                  <td>{preMember.gender}</td>
                  <td>{preMember.area}</td>
                  <td>{preMember.birthYear}</td>
                  <td>
                    {preMember.bio.find((bioObj) => bioObj._id === postId).text}
                  </td>
                  <td className={styles.deny}>
                    <Button
                      text='거절'
                      width='6rem'
                      height='4rem'
                      radius='2rem'
                      ftsize='1.3rem'
                      bg='var(--box-color)'
                      color='#666666'
                      onClick={() => rejectMember(preMember._id)}
                    />
                  </td>
                  <td data-id={preMember._id}>
                    <Button
                      text='승인'
                      width='6rem'
                      height='4rem'
                      radius='2rem'
                      ftsize='1.3rem'
                      bg='#b2f2bb'
                      color='#666666'
                      onClick={() => allowMember(preMember._id)}
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
              {post.members.map((member) => (
                <tr key={uuidv4()}>
                  <td>
                    <Avatar />
                  </td>
                  <td>{member.nickname}</td>
                  <td>{member.gender}</td>
                  <td>{member.area}</td>
                  <td>{member.birthYear}</td>
                  <td>{member.nickname}</td>
                  <td></td>
                  <td data-id={member.nickname}>
                    <Button
                      text='퇴출'
                      width='6rem'
                      height='4rem'
                      radius='2rem'
                      ftsize='1.3rem'
                      bg='var(--box-color)'
                      color='#666666'
                      onClick={() => deleteMember(member._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Manager;
