import React, { useEffect, useState } from 'react'
import Header from '../others/Header';
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useNavigate } from 'react-router';
import {set_att_info, set_emp_data} from '../store/slices/UserSlice'
import axios from 'axios';

const EmpDash = () => {

  const { emp_data } = useSelector((state) => state.data);

  const [isAuthorized, setIsAuthorized] = useState(false);

  const dispatch = useDispatch();
  
  const navigate = useNavigate();


  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/`)
        const {user,data} = response.data;
        dispatch(set_emp_data(user))
        dispatch(set_att_info(data))
        setIsAuthorized(true)
      }
      catch (err) {
        console.log(err)
        if (err.response && err.response.status === 401) {
          if (err.response.data.message == "Unauthorized") {
            alert("You cannot access employees Dashboard");
            return navigate('/admin')
          }
          return navigate("/login")
        } else {
          console.log(err);
        }
        setIsAuthorized(false)
      }
    }
    fetchUserData()
  }, []);

  if(!isAuthorized) return null;

  return (
    <>
      <div className="box-border min-h-screen w-screen bg-[#031114]">
        <Header name={emp_data.fullname} />
        <Outlet />
      </div>
    </>
  )
}

export default EmpDash