// src/pages/AdminLogin.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

const AdminLogin = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const response = await API.post('/admin/login', { email, password });
        localStorage.setItem('token', response.data.token); // Save token
        navigate('/dashboard');
      } catch (err) {
        setError(err.response?.data?.message || 'Login failed');
      }
    };
  
    return (

        <div className='w-96 h-[500px] rounded-lg shadow-neon p-10 flex flex-col gap-16 items-center'>
            <div className='flex justify-center items-center flex-col'>

                <h1 className='bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center text-3xl font-bold'>
                    Admin Login
                </h1>
                <div className=' bg-gradient-to-r from-pink-500 to-violet-500 p-[1px] w-1/2 flex justify-center items-center '></div>
            </div>
            <div className='flex flex-col gap-6'>
                
                <div className='flex items-center'>
                    <label className='w-20' htmlFor="email">Email :</label>
                    <div className='h-9  rounded-md  bg-gradient-to-r from-pink-500 to-violet-500 p-[2px]'>

                        <input className='bg-black rounded-md h-8 outline-none p-2 text-violet-500' value={email} type="text" id='email' onChange={(e)=>setEmail(e.target.value)} />
                    </div>
                </div>
               
                <div className='flex items-center'>
                    <label className='w-20' htmlFor="password">Password:</label>
                    <div className='h-9  rounded-md  bg-gradient-to-r from-pink-500 to-violet-500 p-[2px]'>

                        <input className='bg-black rounded-md h-8 outline-none p-2 ' value={password} type="password" id='password' onChange={(e)=>setPassword(e.target.value)}  />
                    </div>
                </div>
            </div>
            <div className='flex w-36 h-9 justify-center items-center rounded-lg shadow-[0_0_10px_theme("colors.purple.700")] duration-300 hover:shadow-neon'>
                <button className='bg-clip-text w-36 h-9 duration-300 hover:text-transparent bg-gradient-to-r from-pink-500 to-violet-500 flex justify-center items-center font-semibold' onClick= {handleSubmit}>Login</button>
            </div>
        </div>
    )
}


    //   <div className="w-96 h-[500px] rounded-lg shadow-neon p-10 flex flex-col gap-16 items-center">
    //     <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-96">
    //       <h2 className="text-2xl font-bold mb-4">Admin Login</h2>
    //       {error && <p className="text-red-500 mb-4">{error}</p>}
    //       <input
    //         type="email"
    //         placeholder="Email"
    //         className="w-full p-2 border rounded mb-4"
    //         value={email}
    //         onChange={(e) => setEmail(e.target.value)}
    //         required
    //       />
    //       <input
    //         type="password"
    //         placeholder="Password"
    //         className="w-full p-2 border rounded mb-4"
    //         value={password}
    //         onChange={(e) => setPassword(e.target.value)}
    //         required
    //       />
    //       <button className="w-full bg-blue-500 text-white p-2 rounded">Login</button>
    //     </form>
    //   </div>
   
  
  export default AdminLogin;