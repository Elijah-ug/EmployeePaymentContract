 import {createAsyncThunk} from "@reduxjs/toolkit"
import { getContract } from "../../utils/contract"
export const fetchAllEmployeeTasks = createAsyncThunk(
    "tasks/fetchAllEmployeeTasks",
    async (employeeAddress, { rejectWithValue }) => {
        try {
            const contract = await getContract();
            console.log("employeeAddress: ", contract)
            const [_ids, _descriptions, _employees, _amounts, _completes, _funded, _checked] =
                await contract.getAllEmployeeTasks(employeeAddress);
            const tasks = _ids.map((id, index) => ({
                taskId: Number(id),
                descriptions: _descriptions[index],
                employee: _employees[index],
                amount: Number(_amounts[index]),
                isCompleted: _completes[index],
                isFunded: _funded[index],
                isChecked: _checked[index]
            }))
            console.log("employeeAddress: ", tasks)
             return tasks
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
 )
