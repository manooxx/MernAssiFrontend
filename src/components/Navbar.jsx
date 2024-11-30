import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <nav className='bg-[#5e15a644] p-4 px-8 text-white  flex w-full justify-between  items-center rounded-lg  duration-300 shadow-neon'>
      <div className="flex space-x-4 font-semibold  ">
        <Link to="/dashboard" className="hover:underline ">Home</Link>
        <Link to="/dashboard/employeelist" className="hover:underline ">Employee List</Link>
      </div>
      <div className="flex items-center font-semibold space-x-4">
        <span>Admin</span>
        <button onClick={handleLogout} className="bg-red-500  px-4 py-1 rounded-lg hover:bg-red-600">Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
