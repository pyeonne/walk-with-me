import { useContext } from 'react';
import { Context } from '../../../context';

const Arrow = (props) => {
  const [state, dispatch] = useContext(Context);

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='40'
      height='40'
      viewBox='0 0 24 24'
      fill='none'
    >
      <path
        d='M7.41 8.58984L12 13.1698L16.59 8.58984L18 9.99984L12 15.9998L6 9.99984L7.41 8.58984Z'
        fill={state.darkMode ? '#FFFFFF' : '#CCCCCC'}
      />
    </svg>
  );
};

export default Arrow;
