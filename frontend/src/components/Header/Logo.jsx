import React from 'react';
import logoHeader from './images/logoHeader.svg';
import logoSignPage from './images/logoSignPage.svg';

const Logo = (props) => {
  return <img src={props.type == 'col' ? logoSignPage : logoHeader} />;
};

export default Logo;
