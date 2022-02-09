import styled from 'styled-components';
import Email from './icons/Email';
import Password from './icons/Password';
import Area from './icons/Area';
import Title from './icons/Title';
import Nickname from './icons/Nickname';
import BirthYear from './icons/BirthYear';

const InputWrapper = styled.div`
  position: relative;
  margin-bottom: ${(props) => props.marginBottom || '1rem'};
  i {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
  input,
  textarea {
    font-size: 1.6rem;
    color: #666;
    border: 1px solid #ccc;
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
  padding-left: 4rem;
`;

const StyledTextArea = styled.textarea`
  width: ${(props) => props.width || '40rem'};
  height: ${(props) => props.height || '26rem'};
  padding: 1rem;
  line-height: 1.4;
`;

const Input = (props) => {
  if (props.name === 'content') {
    return (
      <InputWrapper style={{ marginBottom: props.marginBottom }}>
        <StyledTextArea
          style={{ width: props.width, height: props.height }}
          placeholder={props.placeholder}
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
        autoComplete={props.autoComplete}
        value={props.value}
        onChange={props.onChange}
        required={props.required}
      />
    </InputWrapper>
  );
};

export default Input;
