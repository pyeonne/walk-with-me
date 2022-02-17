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
import PasswordEdit from './pages/profile/PasswordEdit';

networkService.setupInterceptors();

function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/password-find' element={<PasswordFind />} />
      <Route path='/profile-register' element={<ProfileRegister />} />
      <Route path='/recruit-register' element={<RecruitRegister />} />
      <Route path='/recruit-edit/:postId' element={<RecruitEdit />} />
      <Route path='/:id/profile-edit' element={<ProfileEdit />} />
      <Route path='/:id/password-edit' element={<PasswordEdit />} />
      <Route path='/:id/chatting' element={<Chatting />} />
      <Route path='/:id/profile' element={<Profile />} />
      <Route path='/:id/management' element={<Management />} />
      <Route path='/:id' element={<Recruit />} />
    </Routes>
  );
}

export default App;
