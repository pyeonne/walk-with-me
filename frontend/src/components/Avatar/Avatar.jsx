import styled from 'styled-components';
import avt from './images/defaultAvatar.svg';
const StyledAvatar = styled.img`
  width: ${(props) => props.width || '4rem'};
  height: ${(props) => props.height || '4rem'};
  border-radius: 100%;
`;

const Avatar = (props) => {
  return (
    <StyledAvatar
      src={props.src ? props.src : avt}
      alt={props.alt ? props.alt : '프로필 이미지'}
      width={props.width}
      height={props.height}
    />
  );
};

export default Avatar;
