import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { update_att_info } from '../store/slices/UserSlice';

const Leave = () => {

  const { att_info } = useSelector((state) => state.data);

  const [leaves , setLeaves] = useState(att_info['leaves'])

  const [data,setData] = useState({
    date : '',
    reason : ''
  })


  const dispatch = useDispatch()

  const onChangeHandler = (e) =>{
    const {name,value} = e.target;
    setData({
      ...data,
      [name] : value
    })
  }

  useEffect(()=>{
     if(!att_info.leaves) return;
     setLeaves(att_info.leaves)
  },[att_info])

  
  const pendingLeaves = leaves.filter((result) => {
      return result.status == "pending"
  }) || [];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/leave`, data)
      .then((response) => {
        alert("Leave has been submitted")
        dispatch(update_att_info({ data : response.data , category : 'leaves'}))
        setData({
          date : '',
          reason : ''
        })
      })
    .catch((error) => {
      console.log(error)
      if (error.response.status === 400 && error.response.data.message) {
        alert(error.response.data.message);
      }
    })
  };
  return (
    <div className="w-full my-10 border-4 px-5 py-3 border-[#0f5661] pr-5 flex justify-between">
    <div className="max-w-md w-1/2 mx-auto bg-transparent border-4 border-[#0f5661] p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4 text-[#1a95a8]">Apply Leave</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
         <div>
            <h1 className="block text-[#1a95a8] font-semibold ">Date</h1>
            <input
              value={data.date}
              name="date"
              onChange={onChangeHandler}
              className="text-sm text-white w-full h-10 py-1 px-2 mt-2  rounded outline-none bg-transparent border-[1px] mb-4 border-gray-400"
              type="date"
            />
          </div>
        <div>
          <label className="block text-[#1a95a8] font-semibold">Reason:</label>
          <textarea value={data.reason} name="reason" onChange={onChangeHandler} placeholder='Enter Reason'  type="text" className="text-white w-full mt-2 p-2  border-2 border-[#0f5661] rounded bg-transparent"></textarea>
        </div>
        <button type="submit" className="w-full p-2 text-white rounded bg-blue-500 hover:bg-blue-600">
          Mark Leave
        </button>
      </form>
    </div>
    <div className="w-1/2 ">
      <h1 className="text-2xl text-[#1a95a8] font-bold mb-2">Pending Leaves</h1>
      <div className="max-h-60 overflow-y-auto flex flex-wrap">
      {!pendingLeaves.length > 0 ? <span className="text-white">NO DATA</span>:
        pendingLeaves.map((att) => (
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
  )
}

export default Leave