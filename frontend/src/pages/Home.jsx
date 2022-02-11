import { useEffect, useContext, useState } from 'react';
import { Context } from '../context';
import RequestModal from '../components/Modal/RequestModal';
const Home = () => {
  const [state, dispatch] = useContext(Context);
  const [isOpen, setOpen] = useState(false);
  const mmm = () => {
    setOpen(true);
  };
  return (
    <div>
      <h1>홈</h1>
      <button onClick={mmm}>클릭</button>
      <RequestModal isOpen={isOpen} />
    </div>
  );
};

export default Home;
