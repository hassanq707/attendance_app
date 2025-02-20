import { useState, useEffect } from "react";
import {useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { update_att_info } from "../store/slices/UserSlice";

const Attendance = () => {

  const { att_info } = useSelector((state) => state.data);

  const { emp_data: user } = useSelector((state) => state.data);

  const [attendance , setAttendace] = useState(att_info['attendance'])


  const dispatch = useDispatch()
  
  useEffect(()=>{
     if(!att_info.attendance) return;
     setAttendace(att_info.attendance)
  },[att_info])


  const today = new Date().toISOString().split("T")[0];
  
  const pendingAttendences = attendance.filter((result) => {
      return result.status == "pending"
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/attendance`, { today, _id: user._id })
      .then((response) => {
        if (response.data.message) return alert(response.data.message);
        alert("Attendance has been submitted")
        dispatch(update_att_info({ data : response.data , category : 'attendance'}))
      })
    .catch((err) => console.log(err))
  };

  return (
    <div className="w-full my-10 border-4 px-5 py-3 border-[#0f5661] pr-5 flex justify-between">
      <div className="max-w-md w-1/2 mx-auto bg-transparent border-4 border-[#0f5661] p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-bold mb-4 text-[#1a95a8]">Mark Attendance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#1a95a8] font-semibold">Date:</label>
            <input type="text" value={today} disabled className="w-full p-2 mt-1 border-2 border-[#0f5661]  rounded text-gray-400 bg-transparent" />
          </div>
          <div>
            <label className="block text-[#1a95a8] font-semibold">Full Name:</label>
            <input type="text" value={user.fullname || ""} disabled className="w-full p-2 mt-1 border-2 border-[#0f5661] text-gray-400 rounded bg-transparent" />
          </div>
          <button type="submit" className="w-full p-2 text-white rounded bg-blue-500 hover:bg-blue-600">
            Mark Attendance
          </button>
        </form>
      </div>
      <div className="w-1/2">
        <h1 className="text-2xl text-[#1a95a8] font-bold mb-2">Pending Attendances</h1>
        <div className="max-h-60 overflow-y-auto flex flex-wrap">
        {!pendingAttendences.length > 0 ? <span className="text-white">NO DATA</span>:
          pendingAttendences.map((att) => (
            <div key={att._id} className="min-h-10 mb-2 px-2 border-2 my-3 flex items-center justify-between w-full">
              <h1 className="text-white text-md">
              {new Date(att.date).toISOString().split("T")[0]}
              </h1>
              <div>
                <label className="text-[#1a95a8] font-semibold mr-2">Status:</label>
                <span className="px-3 py-1 rounded text-white bg-yellow-500">
                  {att.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Attendance;


