 import {createAsyncThunk} from "@reduxjs/toolkit"
import { getContract, getSigner } from "../../utils/contract"
import { contractAddress } from "../../config";
import { ethers } from "ethers";
export const fetchFundContract = createAsyncThunk(
    "fund/fetchFundContract",
    async ({ethAmount}, { rejectWithValue }) => {
        try {
            const signer = await getSigner();
            const fund = await signer.sendTransaction({
                to: contractAddress, value: ethers.parseEther(ethAmount)
            })
            await tx.wait()

        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
 )
