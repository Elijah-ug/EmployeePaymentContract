import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { createTaskThunk } from '../../features/thunks/taskThunks';

export default function TaskForm() {
    const dispatch = useDispatch();
    const [description, setDescription] = useState('');
  const [employeeAddress, setEmployeeAddress] = useState('');
    const [amount, setAmount] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
        if (!description || !employeeAddress || !amount) {
            alert("All fields are required!");
            return
        }
      dispatch(createTaskThunk({ description, employeeAddress, amount }));
      setDescription("");
      setEmployeeAddress("");
      setAmount("");
    }
  return (
      <div>
          <form onSubmit={handleSubmit} className="mt-10 space-y-8 px-8 py-5 bg-white rounded shadow max-w-md mx-auto">
      <h2 className="text-xl font-semibold">Create New Task</h2>

      <input
        type="text"
        placeholder="Task Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Employee Address"
        value={employeeAddress}
        onChange={(e) => setEmployeeAddress(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        step="0.00001"
        placeholder="Amount in ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <button type="submit" className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 ml-35">
        Create Task
      </button>
    </form>
    </div>
  )
}
