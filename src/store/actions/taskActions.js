import { getAllTasks, deleteTaskById, editTask } from "../../api/taskServices";
import { TASK_REQUEST, TASK_SUCCESS,TASK_FAILURE } from "../types";

export const taskRequest = () => ({
    type : TASK_REQUEST
})

export const taskSuccess = (data) => ({
    type : TASK_SUCCESS,
    payload : data
});

export const taskFailure = (err) => ({
    type : TASK_FAILURE,
    payload : err
})

export const getTasks = () => dispatch => {
    dispatch(taskRequest())
    getAllTasks()
    .then(data => dispatch(taskSuccess(data.result)))
    .catch(err => dispatch(taskFailure(err)))
};

export const deleteTask = (id) => dispatch => {
    dispatch(taskRequest())
    deleteTaskById(id)
    .then(() => dispatch( getTasks() ))
    .catch(err => dispatch(taskFailure(err)))
}

export const editTaskStatus = (data) => dispatch => {
    dispatch(taskRequest())
    editTask(data)
    .then(() => dispatch( getTasks() ))
    .catch(err => dispatch(taskFailure(err)))
}