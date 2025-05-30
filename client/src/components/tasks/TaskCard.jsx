import React from 'react'

export default function TaskCard({descriptions, employee, isChecked, isCompleted, isFunded, taskId}) {
  return (
      <div className=" bg-green-500 shadow rounded-2xl p-6 hover:bg-green-600">
          <h2>Task Number: {taskId}</h2>
          <p>Description: {descriptions}</p>
          <p>Employee: {employee.slice(0, 7)}...{employee.slice(-5)}</p>
          <p>Completed Status: { isCompleted ? "Completed" : "Pending"}</p>
          <p>Checked Status: {isChecked ? "Checked" : "Not Checked" }</p>
          <p>Funded Status: { isFunded ? "Funded": "Not Funded" }</p>

          {/* <button type="submit" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-35">
        Create Task
      </button> */}
    </div>
  )
}
