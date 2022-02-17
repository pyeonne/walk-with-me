import React, { memo } from 'react';
import styled, { css } from 'styled-components';
import kakao from './images/kakao.svg';
import google from './images/google.svg';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: ${(props) => props.width || '50rem'};
  height: ${(props) => props.height || '6rem'};
  background-color: ${(props) => props.bg || '#7EDA8B'};
  border: ${(props) => props.border || 'none'};
  border-radius: ${(props) => props.radius || '0.4rem'};
  color: ${(props) => props.color || '#ffffff'};
  font-size: ${(props) => props.ftsize || '1.6rem'};
  cursor: pointer;
  ${(props) =>
    props.disabled &&
    css`
      cursor: default;
      background-color: #e5e5e5;
    `}
`;

const BtnImage = styled.i`
  &::before {
    display: inline-block;
    align-items: center;
    content: '';
    background-image: ${(props) =>
      props.image === 'google'
        ? `url(${google})`
        : props.image === 'kakao'
        ? `url(${kakao})`
        : `url(${props.image})`};
    background-repeat: no-repeat;
    background-size: cover;
    width: 24px;
    height: 25px;
    margin-right: 2rem;
  }
`;
const Button = memo((props) => {
  const image = props.image;
  return (
    <>
      {image ? (
        <StyledButton
          type={props.type}
          width={props.width}
          height={props.height}
          bg={props.bg}
          color={props.color}
          radius={props.radius}
          ftsize={props.ftsize}
          border={props.border}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          <BtnImage image={props.image} />
          {props.text}
        </StyledButton>
      ) : (
        <StyledButton
          className={props.className}
          type={props.type}
          width={props.width}
          height={props.height}
          bg={props.bg}
          color={props.color}
          radius={props.radius}
          ftsize={props.ftsize}
          border={props.border}
          onClick={props.onClick}
          disabled={props.disabled}
        >
          {props.children}
          {props.text}
        </StyledButton>
      )}
    </>
  );
});

export default Button;
