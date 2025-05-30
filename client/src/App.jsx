import './App.css';
import TaskForm from './components/admin/TaskForm';
import EmployeeList from './components/employees/EmployeeList';
import Home from './components/home/Home';
import TaskList from './components/tasks/TaskList';
import ConnectWallet from './components/wallet/ConnectWallet';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navigation/NavBar';
import ETaskCard from './components/tasks/ETaskCard';
import {ToastContainer} from "react-toastify"

export default function App() {
  return (
    <div>
      <NavBar/>
      {/* <TaskForm/> */}
      <Routes>
              <Route path="/" element={<Home/>}>Home</Route>
              <Route path="employees" element={<EmployeeList/>}>Employees</Route>
              <Route path="tasks" element={<TaskList />}>Tasks</Route>
              <Route path="your-tasks" element={<ETaskCard/>}>Tasks</Route>
              <Route path="create" element={<TaskForm/>}>Create A task</Route>
      </Routes>
      <ToastContainer
        position="top-right"
        autoClose={5000}  // disappears after 5 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  )
}
