import { useState } from 'react';
import './app.module.css';
import Tab from './components/Tab/Tab';

function App() {
  const [currTab, setCurTab] = useState('소개');

  const handleClickTab = (tab) => {
    setCurrPage(tab);
  };

  return (
    <div className='App'>
      <Tab currTab={currTab} onClick={handleClickTab} />
    </div>
  );
}

export default App;
