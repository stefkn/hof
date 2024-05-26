import {
    ADD_TASK,
    REMOVE_TASK,
    UPDATE_TASK,
} from '../actions.js';

// Define the initial state
const initialState = {
    tasks: [],
};

// Define the tasks reducer
const tasksReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload],
            };
        case REMOVE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task.id !== action.payload),
            };
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return {
                            ...task,
                            ...action.payload.updatedTask,
                        };
                    }
                    return task;
                }),
            };
        default:
            return state;
    }
};

export default tasksReducer;