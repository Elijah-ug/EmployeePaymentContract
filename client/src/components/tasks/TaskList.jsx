import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllEmployeeTasks } from '../../features/tasks/tasksThunk';

export default function TaskList() {
  const { tasks } = useSelector((state) => state.tasks);
  const {address} = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchAllEmployeeTasks());
    console.log("Tasks: ", tasks);
  }, []);

  return (
    <div>TaskList</div>
  )
}
