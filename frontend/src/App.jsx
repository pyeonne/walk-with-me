import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/auth/SignUp';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/signUp' element={<SignUp />} />
    </Routes>
  );
}

export default App;
