import React, { useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux'
import { set_emp_data } from '../store/slices/UserSlice'

const Signup = () => {

  const [data, setData] = useState({
    fullname: '',
    email: '',
    password: '',
  })

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const onChangeHandle = (e) => {
    const { value, name } = e.target;
    setData({
      ...data,
      [name]: value
    })
  }


  const submitHandle = (e) => {


    e.preventDefault();

    axios.post(`${import.meta.env.VITE_BACKEND_URL}/user/signup`, data)
    .then((result) => {
        dispatch(set_emp_data(result.data))
        navigate("/")  
    })
    .catch((err) => console.log(err))

    setTimeout(() => {
      setData({
        fullname: '',
        email: '',
        password: '',
      })
    }, 1000)

  }

  return (
    <div className=' bg-[#031114] w-screen h-screen flex justify-center items-center'>
      <div className='shrink-1 p-6  border-2 border-[#0f5661] rounded-lg'>
        <form onSubmit={submitHandle}>
          <h1 className='mt-3 mb-5 text-center text-3xl text-white'>Signup</h1>
          <div className='mb-5 flex flex-col'>
            <label className='text-white text-lg mb-2'>Fullname: </label>
            <input
              name='fullname'
              value={data.fullname}
              onChange={onChangeHandle}
              className='text-lg text-white p-3 rounded-lg border-2 border-[#0f5661] w-full bg-transparent outline-none'
              type="text"
              placeholder='Enter name'
            />
          </div>
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
          <button type='submit' className='mt-3 rounded w-full p-2 text-white bg-[#0f6c7a] hover:bg-[#12474f]'>Signup</button>
        </form>
      </div>
    </div>
  )
}

export default Signup    