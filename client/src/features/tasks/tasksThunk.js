 import {createAsyncThunk} from "@reduxjs/toolkit"
import { getContract } from "../../utils/contract"
export const fetchAllEmployeeTasks = createAsyncThunk(
    "tasks/fetchAllEmployeeTasks",
    async (_, { rejectWithValue }) => {
        try {
            const contract = await getContract();

            const [_ids, _descriptions, _employees, _amounts, _completes, _funded, _checked] =
                await contract.getAllTasks();
            const tasks = _ids.map((id, index) => ({
                taskId: Number(id),
                descriptions: _descriptions[index],
                employee: _employees[index],
                amount: Number(_amounts[index]),
                isCompleted: _completes[index],
                isFunded: _funded[index],
                isChecked: _checked[index]
            }))
             return tasks
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
 )
