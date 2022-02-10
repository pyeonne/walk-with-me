import { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ProfileRegister from './pages/profile/ProfileRegister';

function App() {
  return (
    <Routes>
      <Route path='/' element={<ProfileRegister />} />
    </Routes>
  );
}

export default App;
