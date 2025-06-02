import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../utils/contract";
import { toast } from "react-toastify";
import { ethers } from "ethers";
import { fetchAllEmployeeTasks } from "../tasks/tasksThunk";

export const fetchFundEmployeeForTaskCompletion = createAsyncThunk(
    "fund/fetchFundEmployeeForTaskCompletion",
    async ({taskId, amount}, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const tx = await contract.fundEmployeeForTaskCompletion(
                taskId, amount, { value: amount });
            await tx.wait();
            dispatch(fetchAllEmployeeTasks())
            toast.success("Task Fund success");
        } catch (error) {
            toast.error("Task fund failed")
            return rejectWithValue(error.message);
        }
    }
)
