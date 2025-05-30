import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllTasksOfEmployee } from '../../features/employeTasks/employeeTasksThunk';
import { fetchEmployeeToDoTask } from '../../features/completeTask/markTaskCompleteThunk';

export default function ETaskCard() {
    const dispatch = useDispatch();
    const { employeeTasks } = useSelector((state) => state.employeesTasks);
    const { address } = useSelector((state) => state.auth);

    const tasks = employeeTasks?.map((task) => task.employee?.toLowerCase() === address?.toLowerCase());
    console.log("true:::", tasks)

  useEffect(() => {
    if (tasks) {
      dispatch(fetchAllTasksOfEmployee());
      }
    }, [dispatch]);
  console.log("address: ", address);
  console.log("Tasks: ", employeeTasks);
  return (
      <div className="">
          <h2 className='text-center my-5 text-white'>Tasks Assigned To: <span className="text-blue-600">{address?.slice(0, 7)}...{ address?.slice(-5)}</span></h2>
          <div className="grid grid-cols-2 gap-2 mx-20 ">
              {
                  employeeTasks.map((task, index) =>
                //   {task.employee == address &&(
                      <div className='bg-green-500 p-5 rounded' key={index}>
                        <p>Assignee: { task.employee}</p>
                        <p>Description: {task.descriptions}</p>
                        <p>Completed Status: { task.isCompleted ? "Completed" : "Pending"}</p>
                        <p>Checked Status: {task.isChecked ? "Checked" : "Not Checked" }</p>
                          <p>Funded Status: {task.isFunded ? "Funded" : "Not Funded"}</p>
                      {!task.isCompleted && (
                          <button onClick={() => dispatch(fetchEmployeeToDoTask(task.taskId))}
                              className="bg-gray-500 mt-2 py-1 px-2 text-white ml-10 rounded cursor-pointer">Complete Task
                          </button>)}
                      </div>
                //   )}

                   )
              }
          </div>
          <h2></h2>
    </div>
  )
}
