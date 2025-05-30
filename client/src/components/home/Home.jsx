import React from 'react'
import ConnectWallet from '../wallet/ConnectWallet'

export default function Home() {
  return (
    <div>
      <div className="flex items-center justify-end mx-10 my-5">
        <ConnectWallet/>
      </div>
      <h1 className="text-center text-4xl text-green-400 mt-8">Employer & Employee Powered</h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 mx-20 mt-5 text-white">
  {/* <!-- Card 1 --> */}
  <div className="bg-green-500 shadow rounded-2xl p-6 cursor-pointer hover:bg-green-600">
    <h2 className="text-xl font-semibold mb-2">Employer</h2>
          <p className="mb-4">The employer assigns a task to a specific employee</p>
          <p className="mb-4">He defines the amount atatched to completing a task</p>
          <p className="mb-4">He verifies the completed task by the employer</p>
          <p className="mb-4">Finally, he releases the money to the employee</p>
    {/* <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">View Task</button> */}
  </div>
        {/* <!-- Card 2 --> */}
        <div className="bg-green-500 shadow rounded-2xl p-6 cursor-pointer hover:bg-green-600">
        <h2 className="text-xl font-semibold mb-2">Employee</h2>
        <p className="mb-4">The employee acknowledges the assigned task</p>
        <p className="mb-4">He does the task and marks it as complete</p>
        <p className="mb-4">Then he waits for verification and the pay</p>
</div>
      </div>
      </div>
  )
}
