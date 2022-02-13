import CardCreate from './CardCreate';
import CardRecruit from './CardRecruit';
import CardDetail from './CardDetail';
import React from 'react';

const Card = ({ style, post, cardType }) => {
  console.log(post);
  if (cardType === 'create') return <CardCreate style={style} />;

  if (!post) {
    return <CardCreate style={style} load={true} />;
  }

  let { age, area, author, likeMembers } = post;
  if (!author) author = { nickname: '이름없음', profileImage: '사진없음' };
  if (!likeMembers && typeof Array.isArray(likeMembers)) likeMembers = [];

  const tags = [`#${area}`, `#${age}대`];

  if (cardType === 'recruit') {
    const newPost = {
      ...post,
      tags,
      author,
      likes: likeMembers.length,
      like: false,
    };
    return <CardRecruit style={style} post={newPost} />;
  }
  if (cardType === 'detail') {
    const pic = likeMembers.map((likes, idx) => {
      if (idx < 3) return likes.profileImage;
    });
    const newPost = {
      ...post,
      tags,
      pic,
      author,
      likeMembers,
      like: false,
    };
    return <CardDetail style={style} post={newPost} />;
  }
};
export default Card;
