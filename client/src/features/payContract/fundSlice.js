
import {createSlice} from "@reduxjs/toolkit";
import { fetchFundContract } from "./autoPayContractThunk";

const initialState = {
    txHash: null,
    loading: false,
    error: null,
}
const fundSlice = createSlice({
    name: "fund",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchFundContract.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchFundContract.fulfilled, (state, action) => {
                state.loading = false;
                state.txHash = action.payload;
            })
            .addCase(fetchFundContract.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
        })
    }
})
export default fundSlice.reducer;
