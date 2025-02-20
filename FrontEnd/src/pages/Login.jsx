import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router';
import { set_att_info, set_emp_data } from '../store/slices/UserSlice';
import { useDispatch } from 'react-redux';

const Login = () => {

  const [data, setData] = useState({
    email: '',
    password: '',
  })

  const [error , setError] = useState(null)

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onChangeHandle = (e) => {
    if(error) setError(null)
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }

  const submitHandle = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/login`, data)
    .then(response => {
      const {user, userData} = response.data;
      dispatch(set_emp_data(user))
      dispatch(set_att_info(userData))
      if(user.role == "admin" ) return navigate("/admin")
      navigate("/")
    })
    .catch(error => {
      console.log(error)
      if (error.response) {
        console.log("Login Failed:", error.response.data.message);
        setError(error.response.data.message);
      } else {
        console.error("Network error:", error);
        setError("Something went wrong. Please try again.");
      }
    });
  }

  return (
    <div className=' bg-[#031114] w-screen h-screen flex justify-center items-center'>
      <div className='shrink-1 p-6  border-2 border-[#0f5661] rounded-lg'>
        <form onSubmit={submitHandle}>
          <h1 className='mt-3 mb-5 text-center text-3xl text-white'>Login</h1>
          <div className='mb-5 flex flex-col'>
            <label className='text-white text-lg mb-2'>Email: </label>
            <input
              name='email'
              value={data.email}
              onChange={onChangeHandle}
              className='text-lg text-white p-3 rounded-lg border-2 border-[#0f5661] w-full bg-transparent outline-none'
              type="email"
              placeholder='Enter e-mail'
            />
          </div>
          <div className='mb-5 flex flex-col'>
            <label className='text-white text-lg mb-3'>Password: </label>
            <input
              name='password'
              value={data.password}
              onChange={onChangeHandle}
              className='text-lg text-white p-3 rounded-lg border-2 border-[#0f5661] w-full bg-transparent outline-none'
              type="password"
              placeholder='Enter password'
            />
          </div>
          {!error ? null : <p className='text-md my-3 text-red-600'>{error}</p> }
           <p className='text-[#126976]'>Don't have an account? <Link className='text-[#23a8bd] ml-1 hover:text-[#0f5661]' to="/signup">Sign up</Link></p>
          <button type='submit' className='mt-3 rounded w-full p-2 text-white bg-[#0f6c7a] hover:bg-[#12474f]'>Login</button>
        </form>
      </div>
    </div>
  )
}

export default Login    