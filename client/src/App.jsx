import './App.css';
import TaskForm from './components/admin/TaskForm';
import EmployeeList from './components/employees/EmployeeList';
import Home from './components/home/Home';
import TaskList from './components/tasks/TaskList';
import ConnectWallet from './components/wallet/ConnectWallet';
import { Routes, Route } from 'react-router-dom';
import NavBar from './navigation/NavBar';

export default function App() {
  return (
    <div>
      <NavBar/>
      {/* <TaskForm/> */}
      <Routes>
              <Route path="/" element={<Home/>}>Home</Route>
              <Route path="employees" element={<EmployeeList/>}>Employees</Route>
              <Route path="tasks" element={<TaskList/>}>Tasks</Route>
              <Route path="create" element={<TaskForm/>}>Create A task</Route>
          </Routes>
    </div>
  )
}
