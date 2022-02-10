import CardCreate from './CardCreate';
import CardRecruit from './CardRecruit';
import CardDetail from './CardDetail';
import React from 'react';

const Card = ({ post, cardType }) => {
  if (cardType === 'create') return <CardCreate />;
  if (!post) {
    return <CardCreate load={true} />;
  }

  const {
    age,
    area,
    author,
    content,
    category,
    isRecruiting,
    likeMembers,
    members,
    _id,
    title,
    image,
  } = post;

  const ages = `${age}대`;
  const tags = [area, ages];
  const pic = likeMembers.map((likes, idx) => {
    if (idx < 3) return likes.profileImage;
  });

  if (cardType === 'recruit')
    return <CardRecruit post={{ ...post, ages, tags, pic }} />;
  if (cardType === 'detail')
    return <CardDetail post={{ ...post, ages, tags, pic }} />;
};
export default Card;
