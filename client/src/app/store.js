import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/auth/authSlice";
import tasksSliceReducer from "../features/tasks/tasksSlice";
import employeesSliceReducer from "../features/employees/employeesSlice";

export const store = configureStore({
    reducer: {
        "auth": authSliceReducer,
        "tasks": tasksSliceReducer,
        "employees": employeesSliceReducer
    }
})
