import CardCreate from './CardCreate';
import CardRecruit from './CardRecruit';
import CardDetail from './CardDetail';
import React, { useContext } from 'react';
import { Context } from '../../context';

const Card = ({ style, post, cardType }) => {
  if (cardType === 'create') return <CardCreate style={style} />;

  const [state, dispatch] = useContext(Context);
  const { user, darkMode } = state;
  if (cardType === 'create') return <CardCreate style={style} user={user} />;
  const { age, area, author, likeMembers, category } = post;
  const tags = [`#${area}`, `#${age}대`, `#${category}`];

  if (cardType === 'recruit') {
    const newPost = {
      ...post,
      tags,
      author,
      likeMembers,
      like: likeMembers.indexOf(state.user?._id) !== -1,
    };
    return <CardRecruit style={style} user={user} post={newPost} />;
  }

  if (cardType === 'detail') {
    const someLikeMembers = likeMembers.slice(0, 3);
    const newPost = {
      ...post,
      tags,
      author,
      someLikeMembers,
      likeMembers,
      like: likeMembers.indexOf(state.user?._id) !== -1,
    };
    return (
      <CardDetail
        style={style}
        user={user}
        post={newPost}
        darkMode={darkMode}
      />
    );
  }
};
export default Card;
