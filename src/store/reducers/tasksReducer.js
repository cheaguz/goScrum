import { TASK_REQUEST, TASK_SUCCESS, TASK_FAILURE } from "../types";

const initialState = {
    loading: false,
    tasks: [],
    error: ""
}

export const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case TASK_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case TASK_SUCCESS:
            return {
                loading: false,
                error: '',
                task: action.payload
            }
        case TASK_FAILURE:
            return {
                loading: false,
                error: action.payload,
                task: []
            }


        default:
            return state;
    }

}