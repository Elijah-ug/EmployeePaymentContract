import { createAsyncThunk } from "@reduxjs/toolkit";
import { getContract } from "../../utils/contract";
import {ethers} from "ethers"

export const createTaskThunk = createAsyncThunk(
    "tasks/createTask",
    async ({ description, employeeAddress, amount }, thunkAPI) => {
        try {
            console.log("Creating task with: ", description, employeeAddress, amount )
            const contract = await getContract();
            // console.log("✅ Contract address from contract.address:", contract.address);
            const parsedAmount = ethers.parseEther(amount.toString());
            const tx = await contract.createTask(description, employeeAddress, parsedAmount);
            await tx.wait()
            console.log("Amount: ", parsedAmount.toString())
            return {description, employeeAddress, parsedAmount: parsedAmount.toString()}
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message);
        }
    }
)
