import { combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer";

export const reducer = combineReducers({
    tasksReducer:  tasksReducer,
})

