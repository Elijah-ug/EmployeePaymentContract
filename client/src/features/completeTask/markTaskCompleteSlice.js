import { createSlice } from "@reduxjs/toolkit";
import { fetchEmployeeToDoTask } from "./markTaskCompleteThunk";

const initialState = {
    completed: null,
    loading: false,
    error: null,
}
const markTaskCompleteSlice = createSlice({
    name: "complete",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeToDoTask.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeToDoTask.fulfilled, (state, action) => {
                state.loading = false;
                state.completed = action.payload;
            })
            .addCase(fetchEmployeeToDoTask.rejected, (state, action) => {
                state.error = action.payload || "Something went wrong!";
        })
    }
})
export default markTaskCompleteSlice.reducer;
