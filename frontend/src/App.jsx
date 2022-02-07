import { useState } from 'react';
import './app.module.css';
import Pagination from './components/Pagination/Pagination';

function App() {
  const [count, setCount] = useState(0);
  const [currPage, setCurrPage] = useState(0);
  const [totalCardCount, setTotalCardCount] = useState(800);
  const [isDark, setIsDark] = useState(true);

  return (
    <div className='App'>
      <Pagination
        currPage={currPage}
        pageCount={Math.ceil(totalCardCount / 8)}
        onClickPage={setCurrPage}
        isDark={isDark}
      />
    </div>
  );
}

export default App;
