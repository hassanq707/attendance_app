import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = ({ name }) => {
  const navigate = useNavigate();
  const { emp_data } = useSelector((state) => state.data);
  const role = emp_data?.role || "admin";

  const handleLogout = () => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/logout`)
      .then(() => navigate('/login'))
      .catch(err => console.log(err));
  };

  return (
    <div className='text-white flex px-7 py-5 items-center justify-between border-b-4 border-[#0f5661] w-full'>
      <div className='select-none'>
        <h1 className='text-lg font-semibold'>Welcome</h1>
        <h1 className='font-extrabold text-2xl mt-2'>{name}</h1>
      </div>
      <nav>
        <ul className='flex gap-10'>
          {role === "employee" ? (
            <>
              <li><NavLink to='/' className={({ isActive }) => `${isActive ? "text-[#0f5661] border-b-2 border-b-[#1b93a5] pb-1" : "text-[#1b93a5]"} text-lg font-bold`}>Attendance</NavLink></li>
              <li><NavLink to='/leave' className={({ isActive }) => `${isActive ? "text-[#0f5661] border-b-2 border-b-[#1b93a5] pb-1" : "text-[#1b93a5]"} text-lg font-bold`}>Leave</NavLink></li>
              <li><NavLink to='/status' className={({ isActive }) => `${isActive ? "text-[#0f5661] border-b-2 border-b-[#1b93a5] pb-1" : "text-[#1b93a5]"} text-lg font-bold`}>Status</NavLink></li>
            </>
          ) : (
            <>
              <li><NavLink to='/admin' end className={({ isActive }) => `${isActive ? "text-[#0f5661] border-b-2 border-b-[#1b93a5] pb-1" : "text-[#1b93a5]"} text-lg font-bold `}>Requests</NavLink></li>
              <li><NavLink to='/admin/Emp_Status' className={({ isActive }) => `${isActive ? "text-[#0f5661] border-b-2 border-b-[#1b93a5] pb-1" : "text-[#1b93a5]"} text-lg font-bold mr-20`}>Employees Status</NavLink></li>
            </>
          )}
        </ul>
      </nav>
      <button onClick={handleLogout} className='py-3 px-7 rounded-sm bg-red-600 hover:bg-red-800 text-lg'>
        Logout
      </button>
    </div>
  );
};

export default Header;
