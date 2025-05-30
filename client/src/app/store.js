import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "../features/auth/authSlice";
import tasksSliceReducer from "../features/tasks/tasksSlice";
import employeesSliceReducer from "../features/employees/employeesSlice";
import employeeTaskSliceReducer from "../features/employeTasks/employeeTasksSlice";
import markTaskCompleteSliceReducer from "../features/completeTask/markTaskCompleteSlice";

export const store = configureStore({
    reducer: {
        "auth": authSliceReducer,
        "tasks": tasksSliceReducer,
        "employees": employeesSliceReducer,
        "employeesTasks": employeeTaskSliceReducer,
        "complete": markTaskCompleteSliceReducer,
    }
})
