import { useEffect, useContext } from 'react';
import { Context } from '../context';

const Home = () => {
  const [state, dispatch] = useContext(Context);

  return (
    <div>
      <h1>홈</h1>
    </div>
  );
};

export default Home;
