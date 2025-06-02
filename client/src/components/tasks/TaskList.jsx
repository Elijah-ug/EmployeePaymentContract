import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployeeTasks } from '../../features/tasks/tasksThunk';
import TaskCard from './TaskCard';

export default function TaskList() {
  const { tasks } = useSelector((state) => state.tasks);
  const { address } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllEmployeeTasks());
    console.log("Tasks: ", tasks);
  }, [dispatch]);

  return (
    <div>
      <h2 className="text-white text-center my-4 text-lg">Task List</h2>
      <div className="mx-44 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {tasks.length > 0? (
          tasks.map((task, index) => <TaskCard
            key={index}
            descriptions={task.descriptions}
            employee={task.employee}
            isChecked={task.isChecked}
            isCompleted={task.isCompleted}
            isFunded = {task.isFunded}
            taskId={task.taskId}
            amount = {task.amount}
          />)
        ): (<h1 className="text-white text-center my-4 text-xl">No Tasks Yet</h1> )}
      </div>
    </div>
  )
}
