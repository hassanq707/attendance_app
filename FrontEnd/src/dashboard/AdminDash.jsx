import React, { useEffect, useState } from 'react'
import axios from "axios"
import Header from '../others/Header'
import { Outlet, useNavigate } from 'react-router'
import { useDispatch} from 'react-redux'
import { set_all_emp_data } from '../store/slices/UserSlice'

const AdminDash = () => {
  
    const [admin,setAdmin] = useState("")
    const [isAuthorized, setIsAuthorized] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch()

    useEffect(() => {
        async function fetchUserData() {
            try {
                const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/allUsers`)
                const {allUsers,admin} = response.data
                dispatch(set_all_emp_data(allUsers))
                setAdmin(admin.fullname)
                setIsAuthorized(true)
            }
            catch (err) {
                console.log(err)
                if (err.response && err.response.status === 401) {
                    alert("You are Unauthorized to access this page");
                    navigate("/") 
                } 
                setIsAuthorized(false);
            }
        }
        fetchUserData();
    }, []);

    if (!isAuthorized) return null; 

    return (
        <div className="bg-[#031114] h-screen">
            <Header name={admin + ' (Admin)'} />
            <Outlet />
        </div>
    )
}

export default AdminDash;
