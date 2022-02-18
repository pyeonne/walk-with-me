import styled from 'styled-components';
import Email from './icons/Email';
import Password from './icons/Password';
import Area from './icons/Area';
import Title from './icons/Title';
import Nickname from './icons/Nickname';
import BirthYear from './icons/BirthYear';
import React, { forwardRef } from 'react';

const InputWrapper = styled.div`
  position: relative;
  i {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 2rem;
    transform: translateY(-50%);
  }
  input,
  textarea {
    font-size: 1.6rem;
    color: var(--input-color);
    border: 1px solid var(--input-select-border-color);
    border-radius: 0.6rem;

    &:focus {
      outline: none;
      border: 1px solid var(--first-color);
    }
  }
`;

const StyledInput = styled.input`
  width: ${(props) => props.width || '50rem'};
  height: ${(props) => props.height || '6rem'};
  padding-left: 6rem;
  background-color: var(--input-background-color);
`;

const StyledTextArea = styled.textarea`
  width: ${(props) => props.width || '40rem'};
  height: ${(props) => props.height || '26rem'};
  padding: 1rem;
  line-height: 1.4;
  background-color: var(--input-background-color);
`;

const Input = forwardRef((props, ref) => {
  if (props.name === 'content') {
    return (
      <InputWrapper style={{ marginBottom: props.marginBottom }}>
        <StyledTextArea
          style={{ width: props.width, height: props.height }}
          placeholder={props.placeholder}
          minLength={props.minLength}
          maxLength={props.maxLength}
          onChange={props.onChange}
          required={props.required}
          value={props.value}
        />
      </InputWrapper>
    );
  }

  if (props.name === 'birthyear') {
    return (
      <InputWrapper style={{ marginBottom: props.marginBottom }}>
        <BirthYear />
        <StyledInput
          style={{ width: props.width, height: props.height }}
          name={props.name}
          placeholder={props.placeholder}
          type={props.type}
          min='1960'
          max='2022'
          step='1'
          ref={ref}
          required={props.required}
        />
      </InputWrapper>
    );
  }

  return (
    <InputWrapper style={{ marginBottom: props.marginBottom }}>
      {props.name === 'email' && <Email />}
      {props.name === 'password' && <Password />}
      {props.name === 'confirmPassword' && <Password />}
      {props.name === 'area' && <Area />}
      {props.name === 'title' && <Title />}
      {props.name === 'nickname' && <Nickname />}
      <StyledInput
        style={{ width: props.width, height: props.height }}
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
        onChange={props.onChange}
        ref={ref}
        required={props.required}
        value={props.value}
        disabled={props.disabled}
      />
    </InputWrapper>
  );
});

export default Input;
