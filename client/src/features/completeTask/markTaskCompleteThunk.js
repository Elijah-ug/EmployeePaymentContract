import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../utils/contract";
import { fetchAllTasksOfEmployee } from "../employeTasks/employeeTasksThunk";
import { toast } from "react-toastify";
export const fetchEmployeeToDoTask = createAsyncThunk(
    "complete/fetchEmployeeToDoTask",
    async (taskId, { dispatch, rejectWithValue }) => {
        try {
            const contract = await getContract();
            console.log(contract)
            const doTask = await contract.employeeToDoTask(taskId);
            console.log("doTask: ", doTask)
            toast.success("Task Marked Complete");
            // refresh the list after marking
            dispatch(fetchAllTasksOfEmployee());
            return doTask;
        } catch (error) {
            console.error("❌ Task completion error:", error);
            toast.error("Failed to complete task!")
            rejectWithValue(error.message);
        }
    }
)
