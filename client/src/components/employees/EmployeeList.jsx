import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmployeeCard from './EmployeeCard';
import { fetchEmployeeList } from '../../features/employees/employeeThunk';
import { formatEther } from 'ethers';

export default function EmployeeList() {
  const { employeeList } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployeeList());
    console.log("EmployeeList: ", employeeList)
  }, [dispatch])

  return (
    <div>
      <h2 className="text-center text-lg text-white">Employees</h2>
      <div>{employeeList.length > 0 ? (<h3 className="text-center text-xl text-white">{ employeeList.length} Employees</h3> ) : (null)}</div>
      <div className="mx-44 grid grid-cols-1 sm:grid-cols-2 gap-4">
         {employeeList.length > 0 ? (
          employeeList.map((employee, index) =>
            <div key={index}>
              <EmployeeCard  employeeId={index + 1} employeeAddress={employee.employeeAddress}
                employeeBalances={formatEther(employee.employeeBalances)} />
              </div>)
        ): (<h1 className="text-center text-xl text-white my-20"><span>No Employees yet</span></h1> )}

      </div>
    </div>
  )
}
