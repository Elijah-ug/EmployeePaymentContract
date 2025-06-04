import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/auth/authSlice";
import tasksSliceReducer from "../features/tasks/tasksSlice";
import employeesSliceReducer from "../features/employees/employeesSlice";
import employeeTaskSliceReducer from "../features/employeTasks/employeeTasksSlice";
import markTaskCompleteSliceReducer from "../features/completeTask/markTaskCompleteSlice";
import fundSliceReducer from "../features/payContract/fundSlice";

export const store = configureStore({
    reducer: {
        "auth": authSliceReducer,
        "tasks": tasksSliceReducer,
        "employees": employeesSliceReducer,
        "employeesTasks": employeeTaskSliceReducer,
        "complete": markTaskCompleteSliceReducer,
        "fund": fundSliceReducer,
    }
})
