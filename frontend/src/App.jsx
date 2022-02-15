import React, { useEffect, useContext } from 'react';
import { Context } from './context';
import { GET_DARK_MODE } from './context/actionTypes';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';
import PasswordFind from './pages/auth/PasswordFind';
import ProfileRegister from './pages/profile/ProfileRegister';
import RecruitRegister from './pages/recruit/RecruitRegister';
import Chatting from './pages/Chatting/Chatting';
import Management from './pages/Management/Management';
import Recruit from './pages/recruit/Recruit';
import ProfileEdit from './pages/profile/ProfileEdit';
import RecruitEdit from './pages/recruit/RecruitEdit';
import { networkService } from './api/api';
import Profile from './pages/profile/Profile';

console.log('import.meta.env :: ', import.meta.env);
console.log('VITE_API_SERVER_URL :: ', import.meta.env.VITE_API_SERVER_URL);
networkService.setupInterceptors();

function App() {
  const [state, dispatch] = useContext(Context);
  useEffect(() => {
    if (window.localStorage.getItem('bgMode') === 'dark') {
      document.getElementsByTagName('body')[0].classList.add('darkTheme');
      dispatch({
        type: GET_DARK_MODE,
        payload: true,
      });
    }
  }, []);

  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/password-find' element={<PasswordFind />} />
      <Route path='/profile-register' element={<ProfileRegister />} />
      <Route path='/:id/profile-edit' element={<ProfileEdit />} />
      <Route path='/recruit-register' element={<RecruitRegister />} />
      <Route path='/recruit-edit/:postId' element={<RecruitEdit />} />
      <Route path='/:id/chatting' element={<Chatting />} />
      <Route path='/:id/profile' element={<Profile />} />
      <Route path='/:id/management' element={<Management />} />
      <Route path='/:postId' element={<Recruit />} />
    </Routes>
  );
}

export default App;
