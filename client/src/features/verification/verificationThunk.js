import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../utils/contract";
import { toast } from "react-toastify";
import { fetchAllEmployeeTasks } from "../tasks/tasksThunk";


export const fetchVerificationOfTaskCompletion = createAsyncThunk(
    "verification/fetchVerificationOfTaskCompletion",
    async (taskId, { rejectWithValue, dispatch }) => {
        try {
            const contract = await getContract();
            const tx = await contract.verificationOfEmployeeTaskCompletion(taskId);
            await tx.wait();
            dispatch(fetchAllEmployeeTasks())
            toast.success("Employee verification success!");
            return tx;
        } catch (error) {
            toast.error("Verification Failed")
            return rejectWithValue(error.message);
        }
    }
 )
