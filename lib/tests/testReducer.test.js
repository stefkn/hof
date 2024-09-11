// Import the necessary dependencies
import tasksReducer from '../state/tasksReducer';

// Test case 1: Test the initial state of the reducer
test('should return the initial state', () => {
  expect(tasksReducer(undefined, {})).toEqual([]);
});

// Test case 2: Test adding a new task
test('should add a new task', () => {
  const initialState = [];
  const action = {
    type: 'ADD_TASK',
    payload: {
      id: 1,
      title: 'Task 1',
      completed: false,
    },
  };
  const expectedState = [
    {
      id: 1,
      title: 'Task 1',
      completed: false,
    },
  ];
  expect(tasksReducer(initialState, action)).toEqual(expectedState);
});

// Test case 3: Test marking a task as completed
test('should mark a task as completed', () => {
  const initialState = [
    {
      id: 1,
      title: 'Task 1',
      completed: false,
    },
  ];
  const action = {
    type: 'MARK_COMPLETED',
    payload: {
      id: 1,
    },
  };
  const expectedState = [
    {
      id: 1,
      title: 'Task 1',
      completed: true,
    },
  ];
  expect(tasksReducer(initialState, action)).toEqual(expectedState);
});
