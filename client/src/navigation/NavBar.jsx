import { NavLink } from "react-router-dom";
export default function NavBar() {
  return (
      <div className="bg-gray-700 text-white flex items-center justify-between py-4 px-10">
          <div className="logo">
          <h3>RemoteWork</h3>
          </div>
          <div className="flex gap-6">
              <NavLink to="/">Home</NavLink>
              <NavLink to="employees">Employees</NavLink>
              <NavLink to="tasks">Tasks</NavLink>
              <NavLink to="your-tasks">Your Tasks</NavLink>
              <NavLink to="create">Create A task</NavLink>
          </div>

    </div>
  )
}
