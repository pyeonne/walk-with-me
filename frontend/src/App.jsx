import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import SignUp from './pages/auth/SignUp';
import Home from './pages/Home';
import SignIn from './pages/auth/SignIn';
import PasswordFind from './pages/auth/PasswordFind';
import ProfileRegister from './pages/profile/ProfileRegister';
import Chatting from './pages/Chatting/Chatting';
import Manager from './pages/Manager/Manager';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/password-find' element={<PasswordFind />} />
      <Route path='/profile-register' element={<ProfileRegister />} />
      <Route path='/chatting' element={<Chatting />} />
      <Route path='/manager' element={<Manager />} />
    </Routes>
  );
}

export default App;
