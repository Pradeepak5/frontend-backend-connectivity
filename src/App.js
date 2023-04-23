import {Routes,Route,Navigate} from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
import SendMail from './components/SendMail';
import SetPassword from './components/SetPassword';
export const url = "https://b43wdt.onrender.com"


function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='/resetpassword' element={<SendMail />}/>
      <Route path='/setpassword/:id' element={<SetPassword />}/>
      <Route path='*' element={<Navigate to='/login'/>}/>
    </Routes>
    </>
  );
}

export default App;
