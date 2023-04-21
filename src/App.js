import {Routes,Route,Navigate} from 'react-router-dom';
import Login from './components/login';
import Dashboard from './components/dashboard';
export const url = "https://b43wdt.onrender.com"


function App() {
  return (
    <>
    <Routes>
      <Route path='/login' element={<Login />}/>
      <Route path='/dashboard' element={<Dashboard />}/>
      <Route path='*' element={<Navigate to='/'/>}/>
    </Routes>
    </>
  );
}

export default App;
