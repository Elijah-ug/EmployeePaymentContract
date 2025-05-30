import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract, getSigner } from "../../utils/contract"

export const fetchEmployeeList = createAsyncThunk(
    "employees/fetchEmployeeList",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            const [ids, addresses, balances] = await contract.getAllEmployees();
            const tx = await contract.getAllEmployees();
            const employeeList = ids.map((id, idx) => ({
                employeeId: Number(id),
                employeeAddress: addresses[idx],
                employeeBalances: balances[idx].toString(),
              }));
            // const employeeList = tx.map((emp) => console.log("Address: ", emp.employeeAddress))
            // console.log("🧑‍💼 Employee List from contract:", employeeList);
            return employeeList;
        } catch (error) {
            console.error("❌ Error fetching employees", error);
            return rejectWithValue(error.message);
        }
    }
)
