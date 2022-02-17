import CardCreate from './CardCreate';
import CardRecruit from './CardRecruit';
import CardDetail from './CardDetail';
import React from 'react';

const Card = ({ style, post, cardType }) => {
  if (cardType === 'create') return <CardCreate style={style} />;

  if (!post) {
    return <CardCreate style={style} load={true} />;
  }

  const { age, area, author, likeMembers } = post;
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
    const someLikeMembers = likeMembers.slice(0, 3);
    const newPost = {
      ...post,
      tags,
      author,
      someLikeMembers,
      likeMembers,
      like: false,
    };
    return <CardDetail style={style} post={newPost} />;
  }
};
export default Card;
