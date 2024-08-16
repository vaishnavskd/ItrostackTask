import './App.css';
import { Routes, Route } from 'react-router-dom'
import Main from './pages/Main';
import Login from './components/Login';
import StaffDashboard from './pages/StaffDashboard';
import CreateAppointment from './components/CreateAppointment';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/login' element={<Main child={<Login/>}/>}/>
      <Route path='/staff' element={<StaffDashboard/>}/>
      <Route path='/create-appointment' element={<Main child={<CreateAppointment/>}/>}/>
    </Routes>
  );
}

export default App;
