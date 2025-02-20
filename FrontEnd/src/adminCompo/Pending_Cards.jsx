import axios from 'axios';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { set_all_emp_data } from '../store/slices/UserSlice';

const Pending_Cards = ({ data, property }) => {

  const { all_emp_data } = useSelector((result) => result.data);
  

  const dispatch = useDispatch();

  const handleAttendance = async (btn) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/markAttendance`,
        { _id: data._id, btn, property }
      );
      const updatedusers = all_emp_data.map((elem) => {
        if (elem._id == response.data.updatedUser._id) {
          return { ...elem, attendance: response.data.updatedUser.attendance, leaves: response.data.updatedUser.leaves };
        } else {
          return elem;
        }
      });
      alert(`${property} has been marked`);
      dispatch(set_all_emp_data(updatedusers));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className=" mb-2 px-2 border-4 border-[#0f5661] my-3 flex flex-col w-full p-4  rounded">
      <div className="flex justify-between items-center">
        <div>
          <label className="text-[#1a95a8] font-semibold mr-2">Date:</label>
          <h1 className="inline text-white text-md">
            {new Date(data.date).toDateString()}
          </h1>
        </div>
        <div>
          <label className="text-[#1a95a8] font-semibold mr-2">Name:</label>
          <h1 className="inline text-white font-bold">{data.user.fullname}</h1>
        </div>
        <div className="mt-3 flex justify-end">
        <button onClick={() => handleAttendance("accepted")} className="px-3 py-1 mx-2 rounded text-white bg-green-500">Accept</button>
        <button onClick={() => handleAttendance("rejected")} className="px-3 py-1 rounded text-white bg-red-500">Reject</button>
      </div>
      </div>

      {property === 'leaves' && (
        <div className="w-full mt-2">
          <label className="text-[#1a95a8] font-semibold">Reason:</label>
          <h1 className="text-white bg-gray-700 p-2 rounded">{data.reason}</h1>
        </div>
      )}


    </div>
  );
};

export default Pending_Cards;
