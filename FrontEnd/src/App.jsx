import React from "react";
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import axios from "axios"
import EmpDash from "./dashboard/EmpDash";
import AdminDash from "./dashboard/AdminDash";
import Leave from "./empCompo/Leave"
import Attendance from "./empCompo/Attendance"
import Req_Attendance from "./adminCompo/Req_Attendance";
import Emp_Status from "./adminCompo/Emp_Status";
import WorkStatus from "./empCompo/WorkStatus"; 


axios.defaults.withCredentials = true;

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<EmpDash />}>
        <Route path="" element={<Attendance />}/>
        <Route path="leave" element={<Leave />}/>
        <Route path="status" element={<WorkStatus />}/>
      </Route>
      <Route path="/admin" element={<AdminDash />}>
         <Route path="" element={<Req_Attendance />}/>
         <Route path="Emp_Status" element={<Emp_Status />}/>
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;