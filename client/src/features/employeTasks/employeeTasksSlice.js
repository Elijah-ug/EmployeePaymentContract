import { createSlice } from "@reduxjs/toolkit";
import { fetchAllTasksOfEmployee } from "./employeeTasksThunk";


const initialState = {
    employeeTasks: [],
    loading: false,
    error: null,
}

const employeeTaskSlice = createSlice({
    name: "employeesTasks",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllTasksOfEmployee.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchAllTasksOfEmployee.fulfilled, (state, action) => {
                state.loading = false;
                state.employeeTasks = action.payload;
            })
            .addCase(fetchAllTasksOfEmployee.rejected, (state, action) => {
                state.loading = false;
                state.employeeTasks = [];
                state.error = action.payload;
            });
    }
})
export default employeeTaskSlice.reducer;
