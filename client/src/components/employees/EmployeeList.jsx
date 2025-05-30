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
      <h2>Employees</h2>
      {employeeList && (<h3>{ employeeList.length}</h3> )}
      <div className="mx-44 grid grid-cols-1 sm:grid-cols-2 gap-4">
         {employeeList && (
          employeeList.map((employee, index) =>
            <div>
              <EmployeeCard key={index} employeeId={index + 1} employeeAddress={employee.employeeAddress}
                employeeBalances={formatEther(employee.employeeBalances)} />
              </div>)
        )}

      </div>
    </div>
  )
}
