import { combineReducers } from "redux";
import { tasksReducer } from "./tasksReducer";

const rootReducer =combineReducers({
    tasksReducer:  tasksReducer,
})

export default rootReducer