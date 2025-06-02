import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { fetchVerificationOfTaskCompletion } from '../../features/verification/verificationThunk';
import { fetchFundEmployeeForTaskCompletion } from '../../features/funding/taskFundThunk';

export default function TaskCard({ descriptions, employee, isChecked, isCompleted, isFunded, taskId, amount }) {
  const [loadingVerify, setLoadingVerify] = useState(false);
  const [loadingFund, setLoadingFund] = useState(false);
  const dispatch = useDispatch()
  const handleVeryfy = async () => {
    setLoadingVerify(true)
    try {
      await dispatch(fetchVerificationOfTaskCompletion(taskId)).unwrap()
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingVerify(false)
    }
  }
  const handleFund = async () => {
    setLoadingFund(true)
    try {
      // await dispatch(fetchVerificationOfTaskCompletion(taskId)).unwrap()
      await dispatch(fetchFundEmployeeForTaskCompletion({ taskId, amount })).unwrap();
    } catch (error) {
      console.log(error)
    } finally {
      setLoadingFund(false)
    }
  }

  console.log("isChecked: ", isChecked)
  console.log("isCompleted: ", isCompleted)
  return (
      <div className="{ bg-green-500 shadow rounded-2xl p-6 hover:bg-green-600}">
          <h2 className="py-1">Task Number: {taskId}</h2>
          <p className="py-1">Description: {descriptions}</p>
          <p className="py-1">Employee: {employee.slice(0, 7)}...{employee.slice(-5)}</p>
          <p className="py-1">Completed Status: { isCompleted ? "✅ Completed" : "Pending"}</p>
          <p className="py-1">Checked Status: {isChecked ? "✅ Checked" : "Not Checked" }</p>
      <p className="py-1">Funded Status: {isFunded ? "✅ Funded" : "Not Funded"}</p>
      <div className="flex gap-5">
      <button onClick={handleVeryfy} disabled={!isCompleted || isChecked || loadingVerify}
        className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded
        ${isCompleted || isChecked? "bg-red-400" : ""}`}>
        Verify Task
      </button>

      <button onClick={handleFund} disabled={!isCompleted || !isChecked || loadingFund}
        className={`cursor-pointer bg-blue-600 text-white px-4 py-2 rounded
          ${isCompleted || isFunded || isChecked? "bg-red-400" : ""}`}>
        Fund Task
        </button>
        </div>
    </div>
  )
}
