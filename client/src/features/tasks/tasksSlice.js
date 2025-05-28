import { fetchAllEmployeeTasks } from "./tasksThunk";

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    tasks: [],
    loading: false,
    error: null,
}
const tasksSlice = createSlice({
    name: "tasks",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllEmployeeTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchAllEmployeeTasks.fulfilled, (state, action) => {
                state.loading = false;
                state.tasks = action.payload;
            })
            .addCase(fetchAllEmployeeTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
        })
    }
})
export default tasksSlice.reducer;
