import styled from 'styled-components';
import kakao from './images/kakao.svg';
import google from './images/google.svg';
const BtnWrap = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
`;

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
`;

const BtnImage = styled.i`
  &::before {
    display: inline-block;
    align-items: center;
    content: '';
    background-image: ${(props) =>
      props.image === 'google' ? `url(${google})` : `url(${kakao})`};
    background-repeat: no-repeat;
    background-size: cover;
    width: 24px;
    height: 25px;
    margin-right: 2rem;
  }
`;
const Button = (props) => {
  const image = props.image;
  return (
    <BtnWrap>
      {image ? (
        <StyledButton
          width={props.width}
          height={props.height}
          bg={props.bg}
          color={props.color}
          radius={props.radius}
          ftsize={props.ftsize}
          border={props.border}
        >
          <BtnImage image={props.image} />
          {props.text}
        </StyledButton>
      ) : (
        <StyledButton>{props.text}</StyledButton>
      )}
    </BtnWrap>
  );
};

export default Button;
