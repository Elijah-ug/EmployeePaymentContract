import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../utils/contract";

export const fetchAllTasksOfEmployee = createAsyncThunk(
    "employeesTasks/fetchAllEmployeeTasks",
    async (_, { rejectWithValue }) => {

        try {
            const contract = await getContract();
            // console.log(contract);
             const [_ids, _descriptions, _employees, _amounts, _completes, _funded, _checked] =
                await contract.getAllEmployeeTasks();
            const employeeTasks = _ids.map((id, index) => ({
                taskId: Number(id),
                descriptions: _descriptions[index],
                employee: _employees[index],
                amount: Number(_amounts[index]),
                isCompleted: _completes[index],
                isFunded: _funded[index],
                isChecked: _checked[index]
            }))
            console.log("🧑‍💼 Employee List from contract:", employeeTasks);
             return employeeTasks
        } catch (error) {
            rejectWithValue(error.message)
        }
    }
)
