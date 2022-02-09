import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProfileRegister from './pages/profile/ProfileRegister';
function App({ FileInput }) {
  return (
    <Routes>
      <Route path='/' element={<ProfileRegister FileInput={FileInput} />} />
    </Routes>
  );
}

export default App;
