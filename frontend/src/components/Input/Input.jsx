import Wrapper from '../Wrapper/Wrapper';
import styled from 'styled-components';
import Email from './icons/Email';
import Password from './icons/Password';
import Area from './icons/Area';
import Category from './icons/Category';
import Age from './icons/Age';
import Title from './icons/Title';

const InputWrapper = styled.div`
  position: relative;
  i {
    width: 24px;
    height: 24px;
    position: absolute;
    top: 50%;
    left: 1rem;
    transform: translateY(-50%);
  }
`;

const StyledInput = styled.input`
  width: ${(props) => props.width || '50rem'};
  height: ${(props) => props.height || '6rem'};
  border: 1px solid #ccc;
  border-radius: 0.6rem;
  font-size: 1.6rem;
  color: #666;
  padding-left: 4rem;
  &:focus {
    outline: none;
    border: 1px solid var(--first-color);
  }
`;

const Input = (props) => {
  return (
    <InputWrapper>
      {props.name === 'email' && <Email />}
      {props.name === 'password' && <Password />}
      {props.name === 'area' && <Area />}
      {props.name === 'category' && <Category />}
      {props.name === 'age' && <Age />}
      {props.name === 'title' && <Title />}
      <StyledInput
        name={props.name}
        type={props.type}
        placeholder={props.placeholder}
      />
    </InputWrapper>
  );
};

export default Input;
