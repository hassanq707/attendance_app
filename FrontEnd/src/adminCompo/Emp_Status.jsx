import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Emp_Status = () => {
  const { all_emp_data } = useSelector(state => state.data);
  const employees = all_emp_data.filter(emp => emp.user.role === 'employee');

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [tab, setTab] = useState('attendance');
  const [filteredData, setFilteredData] = useState([]);
  const [attendancePercentage, setAttendancePercentage] = useState(0);

  useEffect(() => {
    if (!selectedUser) return;

    const user = employees.find(emp => emp.user._id === selectedUser);
    if (!user) return;

    const monthData = user[tab]?.filter(item =>
      new Date(item.date).getMonth() + 1 === selectedMonth
    ) || [];


    setFilteredData(monthData);

    if (tab === 'attendance') {
      const totalDays = monthData.length;
      const presentDays = monthData.filter(item => item.status === 'accepted').length;
      setAttendancePercentage((presentDays / totalDays) * 100 || 0);
    }
  }, [selectedUser, selectedMonth, tab, all_emp_data]);


  return (
    <div className="p-4 mt-3 text-white">
      <h2 className="text-3xl font-bold text-[#1a95a8]">Employee Work Status</h2>

      <div className="flex gap-4 my-4">
        <select 
          className="p-2 bg-[#167a8a] hover:bg-[#136774] rounded" 
          onChange={e => setSelectedUser(e.target.value)} 
          value={selectedUser}
        >
          <option value="">Select Employee</option>
          {employees.map(emp => (
            <option key={emp.user._id} value={emp.user._id}>{emp.user.fullname}</option>
          ))}
        </select>

        <button 
          className={`${tab === 'attendance' ? 'bg-[#124e57]' : 'bg-[#167a8a]'} px-4 py-2 rounded`} 
          onClick={() => setTab('attendance')}
        >
          Attendance
        </button>
        <button 
          className={`${tab === 'leaves' ? 'bg-[#124e57]' : 'bg-[#167a8a]'} px-4 py-2 rounded`} 
          onClick={() => setTab('leaves')}
        >
          Leaves
        </button>
        
        <select 
          className="p-2 bg-[#167a8a] hover:bg-[#136774] rounded" 
          onChange={e => setSelectedMonth(Number(e.target.value))} 
          value={selectedMonth}
        >
          {[...Array(12)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{new Date(2025, i).toLocaleString('default', { month: 'long' })}</option>
          ))}
        </select>
      </div>

      {tab === 'attendance' && filteredData.length > 0 && (
        <div className="mb-4 p-3 border-2 border-[#0f5661] rounded">
          <h3 className="font-semibold">Attendance Percentage: {attendancePercentage.toFixed(2)}%</h3>
        </div>
      )}

      <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
        {filteredData.length > 0 ? (
          filteredData.map(item => (
            <div key={item._id} className="border-[4px] border-[#0f5661] my-3 px-3 py-2 rounded-md">
              <div className="flex justify-between w-full">
                <div>
                  <label className="text-[#1a95a8] font-semibold">Date:</label>
                  <h1 className="text-white text-md ml-2 inline">
                    {new Date(item.date).toDateString()}
                  </h1>
                </div>
                <div>
                  <label className="text-[#1a95a8] font-semibold">Status:</label>
                  <span className={`ml-2 px-3 py-1 rounded text-white ${item.status === 'accepted' ? 'bg-green-500' :
                    item.status === 'rejected' ? 'bg-red-500' : 'bg-yellow-500'
                    }`}>
                    {item.status}
                  </span>
                </div>
              </div>

              {tab === 'leaves' && item.reason && (
                <div className="w-full mt-2">
                  <label className="text-[#1a95a8] font-semibold">Reason:</label>
                  <h1 className="text-white bg-gray-800 p-2 rounded">{item.reason}</h1>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className='border-2 border-[#0f5661] text-md py-2 px-1'>No records found for selected user and month</p>
        )}
      </div>
    </div>
  );
};

export default Emp_Status;
