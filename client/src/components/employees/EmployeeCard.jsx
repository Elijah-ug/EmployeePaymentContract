
export default function EmployeeCard({ employeeId, employeeAddress, employeeBalances }) {
  return (

     <div className="">
       <div className=" bg-green-500 shadow rounded-2xl p-6 cursor-pointer hover:bg-green-600">
      <div className="">
        <h2>Employee Number: { employeeId }</h2>
      </div>
      <div className="id">
        <h2>Acc: { employeeAddress }</h2>
      </div>
      <div className="id">
        <h2>Balance: { employeeBalances }ETH</h2>
        </div>
      </div>
      </div>
  )
}
