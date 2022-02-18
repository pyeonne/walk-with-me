import React from 'react';
import logoHeader from './images/logoHeader.svg';
import logoSignPage from './images/logoSignPage.svg';
import { useNavigate } from 'react-router-dom';

const Logo = (props) => {
  const navigate = useNavigate();

  const onClickHandler = (boolean) => {
    if (boolean) {
      alert('기본 정보를 입력해주세요.');
      return;
    }
    navigate('/');
  };

  return (
    <img
      style={{ cursor: 'pointer' }}
      src={props.type == 'col' ? logoSignPage : logoHeader}
      onClick={() => {
        onClickHandler(props.disabled);
      }}
    />
  );
};

export default Logo;
