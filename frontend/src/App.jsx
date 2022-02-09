import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
import SignIn from './pages/auth/SignIn';
import ProfileRegister from './pages/profile/ProfileRegister';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/profile-register' element={<ProfileRegister />} />
    </Routes>
  );
}

export default App;
