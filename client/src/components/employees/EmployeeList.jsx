import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmployeeCard from './EmployeeCard';
import { fetchEmployeeList } from '../../features/employees/employeeThunk';

export default function EmployeeList() {
  const { employeeList } = useSelector((state) => state.employees);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchEmployeeList());
    console.log("EmployeeList: ", employeeList)
  }, [])


  return (
    <div>
      <h2>Employees</h2>
      <div className="emp">
        {/* {employeeList && (
          employeeList.map((employee, index) => <h2>{ employee.employeeAddress}</h2>  )

        )} */}
        {/* <EmployeeCard  /> */}
      </div>
    </div>
  )
}
