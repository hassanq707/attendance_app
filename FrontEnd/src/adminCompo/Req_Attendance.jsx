import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import Pending_Cards from './Pending_Cards'

const Req_Attendance = () => {

  const { all_emp_data } = useSelector(result => result.data)

  const [btn, setBtn] = useState("attendance")

  const [data, setData] = useState([])

  const handleBtnClick = (btn) => {
    setBtn(btn)
  }

  // Agar aap flatMap ke andar map aur filter use kar rahe ho, 
  // to flatMap ka emp object uske andar likhe sab functions ko accessible hota hai.
  // Matlab jab flatMap run hoga, har ek emp ka reference filter aur 
  // map dono ke andar pass hoga kyunki yeh flatMap ke andar likhe gaye hain.

  // const all_emp_data2 = [
  //   { user: "A", attendance: [{ date: "2024-02-01" }, { date: "2024-02-02" }] },
  //   { user: "B", attendance: [{ date: "2024-02-03" }] }
  // ];

  // const result = all_emp_data2.map(emp => emp["attendance"]);
  // console.log(result);

  // flatMap is liye use kiya ke index me attendance ka array 
  // araha tha jiski wajha se array of array ban raha tha

  useEffect(() => {
    if (all_emp_data?.length > 0) {
      const filteredData = all_emp_data.flatMap(emp =>
        (emp[btn])
          .filter(record => record.status === "pending") 
          .map(record => ({
            ...record,
            user: emp.user
          }))
      );
      setData(filteredData);
    }
  }, [btn, all_emp_data]);

  
  return (
    <div className='w-full '>
      <div className='flex items-center text-white px-4'>
        <h1 className='text-[#1c8d9e] text-2xl font-bold'>Pending</h1>
        <button onClick={() => handleBtnClick("attendance")} className={`${btn == "attendance" ? "bg-[#124e57]" : "bg-[#167a8a]"} py-3 px-5 rounded md m-4`}>
          Attendance
        </button>
        <button onClick={() => handleBtnClick("leaves")} className={`${btn == "leaves" ? "bg-[#124e57]" : "bg-[#167a8a]"} py-3 px-5 rounded md m-4`}>
          Leaves
        </button>
      </div>
      {!data.length > 0 ? <p className='text-center text-white capitalize'>No Pending {btn}</p>
        :
        <div className="w-full">
          <div className="max-h-[355px] overflow-y-auto flex flex-wrap">
            {data.map((elem) => (
              <Pending_Cards data={elem} key={elem._id} property={btn}/>
            ))}

          </div>
        </div>
      }
    </div>
  )
}

export default Req_Attendance