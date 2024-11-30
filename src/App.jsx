// src/App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <>
   <div className='bg-black min-h-screen w-full text-white flex justify-center items-center'>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AdminLogin />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/employeelist" element={<EmployeeList/>} />
      </Routes>
    </BrowserRouter>
    </div>
    </>
  );
}

export default App;
