import React from 'react';

import Navbar from '../components/Navbar';


const Dashboard = () => {
  return (
    <div className='w-full' >
        <Navbar />
    <div className="h-screen w-full  flex flex-col   ">
      
      <div className=" flex w-full h-screen justify-center items-center">
        <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 text-4xl font-bold mb-4">Welcome to Admin Panel</h1>
       


      </div>
    </div>
    </div>        
  );
};

export default Dashboard;
