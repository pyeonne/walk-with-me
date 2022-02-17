import { useContext } from 'react';
import { Context } from '../../../context';

const Password = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <i>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        xmlns='http://www.w3.org/2000/svg'
      >
        <path
          d='M19.5 9H18.25V7C18.25 4.24 15.45 2 12 2C8.55 2 5.75 4.24 5.75 7V9H4.5C3.125 9 2 9.9 2 11V21C2 22.1 3.125 23 4.5 23H19.5C20.875 23 22 22.1 22 21V11C22 9.9 20.875 9 19.5 9ZM12 18C10.625 18 9.5 17.1 9.5 16C9.5 14.9 10.625 14 12 14C13.375 14 14.5 14.9 14.5 16C14.5 17.1 13.375 18 12 18ZM15.875 9H8.125V7C8.125 5.29 9.8625 3.9 12 3.9C14.1375 3.9 15.875 5.29 15.875 7V9Z'
          fill={state.darkMode ? '#FFFFFF' : '#CCCCCC'}
        />
      </svg>
    </i>
  );
};

export default Password;
