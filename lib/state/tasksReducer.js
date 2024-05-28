import { ADD_TASK, REMOVE_TASK, UPDATE_TASK } from './actions';

const tasksReducer = (state, action) => {
    console.log(action);
    switch (action.type) {
        case ADD_TASK:
            return [...state, action.task]
        case REMOVE_TASK:
            return state.filter(task => task.id !== action.id)
        case UPDATE_TASK:
            return state.map(task => {
                if (task.id === action.task.id) {
                    return action.task
                }
                return task;
            });
        default:
            throw Error('Unknown action: ' + action.type);
    }
};

export default tasksReducer;