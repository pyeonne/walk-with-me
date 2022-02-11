import React from 'react';
import logoHeader from './images/logoHeader.svg';
import logoSignPage from './images/logoSignPage.svg';
import { useNavigate } from 'react-router-dom';

const Logo = (props) => {
  const navigate = useNavigate();

  const onClickHandler = () => {
    navigate('/');
  };

  return (
    <img
      style={{ cursor: 'pointer' }}
      src={props.type == 'col' ? logoSignPage : logoHeader}
      onClick={onClickHandler}
    />
  );
};

export default Logo;
