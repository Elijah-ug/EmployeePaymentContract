import { fetchEmployeeList } from "./employeeThunk";

import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    employeeList: [],
    loading: false,
    error: null,
}
const employeesSlice = createSlice({
    name: "employees",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchEmployeeList.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchEmployeeList.fulfilled, (state, action) => {
                state.employeeList = action.payload;
        })
        .addCase(fetchEmployeeList.rejected, (state, action) => {
            state.employeeList = action.payload;
        })
    }
})
export default employeesSlice.reducer;
