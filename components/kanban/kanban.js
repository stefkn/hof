import {
  TASK_STATUS_TODO,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_DONE,
  TASK_STATUS_FOCUS,
} from '../../lib/state/taskStatuses';
import {
  LOCAL_STORAGE_KEY,
  ADD_TASK,
  REMOVE_TASK,
  UPDATE_TASK,
  LOAD_TASKS
} from '../../lib/state/actions';

import { useReducer, useEffect, useState } from 'react';
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import KanbanItem from './kanbanItem';
import CurrentTask from './currentTask';
import tasksReducer from '../../lib/state/tasksReducer';
import localforage from 'localforage';

export default function Kanban({ kanbanItems }) {
  const [tasks, dispatch] = useReducer(tasksReducer, []);
  const [taskNum, setTaskNum] = useState(1);

  // formkit drag and drop configuration
  const config = {
    group: "todoList",
    sortable: true,
    draggable: (el) => !el.classList.contains("no-drag"),
    // custom handleEnd function to update tasks via reducer to keep state in sync
    handleEnd(event) {
      const taskId = event.targetData.node.data.value.id;
      const newStatus = event.targetData.parent.el.id;
      updateTaskStatus(taskId, newStatus);
    }
  }

  // formkit drag and drop hooks
  const [todoList, todos, setTodos] = useDragAndDrop([], config);
  const [inProgressList, inProgs, setInProgs] = useDragAndDrop([], config);
  const [doneList, dones, setDones] = useDragAndDrop([], config);
  const [focusTask, focus, setFocus] = useDragAndDrop([], {
    ...config,
    accepts: (_parent, lastParent) => {
      // only one task can be in focus at a time
      return focus.length === 0;
    }
  });

  useEffect(() => {
    console.log('tasks changed', tasks);
    if (!tasks) return;
    // update the formkit drag and drop lists when tasks change
    setTodos(tasks.filter(task => task.status === TASK_STATUS_TODO));
    setInProgs(tasks.filter(task => task.status === TASK_STATUS_IN_PROGRESS));
    setDones(tasks.filter(task => task.status === TASK_STATUS_DONE));
    setFocus(tasks.filter(task => task.status === TASK_STATUS_FOCUS));

    // save tasks to local storage
    localforage.setItem(LOCAL_STORAGE_KEY, tasks).catch(function (err) {
      console.log(err);
    });
  }, [tasks]);

  useEffect(() => {
    // load tasks from local storage
    localforage.getItem(LOCAL_STORAGE_KEY).then(tasks => {
      if (tasks) {
        console.log('loaded tasks from local storage', tasks);
        dispatch({ type: LOAD_TASKS, tasks });
      }
    }).catch(function (err) { console.log(err); });
  }, []);

  function addNewItem(status = TASK_STATUS_TODO) {
    dispatch({
      type: ADD_TASK,
      task: {
        id: generateKey(tasks.length + 1),
        status: status,
        title: 'New task ' + (taskNum),
        description: 'This is the task description.',
      }
    });
    setTaskNum(taskNum + 1);
  }

  function deleteItem(id) {
    dispatch({
      type: REMOVE_TASK,
      id: id,
    });
  }

  function updateTask(id, newTask) {
    const taskToUpdate = tasks.find(task => task.id === id)

    if (!taskToUpdate) return;

    dispatch({
      type: UPDATE_TASK,
      task: { ...newTask, id: id },
    });
  }

  function updateTaskStatus(id, status) {
    const taskToUpdate = tasks.find(task => task.id === id)

    if (!taskToUpdate) return;

    dispatch({
      type: UPDATE_TASK,
      task: {
        id: id,
        status: status,
        title: taskToUpdate.title,
        description: taskToUpdate.description,
      }
    });
  }

  function updateItem(id, title, description) {
    const taskToUpdate = tasks.find(task => task.id === id)

    if (!taskToUpdate) return;

    dispatch({
      type: UPDATE_TASK,
      task: {
        id: id,
        status: taskToUpdate.status,
        title: title,
        description: description,
      }
    });
  }

  function progressItem(id) {
    const taskToUpdate = tasks.find(task => task.id === id)

    if (!taskToUpdate) return;

    let newTaskState = null;

    switch (taskToUpdate.status) {
      case TASK_STATUS_TODO:
        newTaskState = TASK_STATUS_IN_PROGRESS;
        break;
      case TASK_STATUS_IN_PROGRESS:
        newTaskState = TASK_STATUS_DONE;
        break;
      case TASK_STATUS_DONE:
        newTaskState = TASK_STATUS_DONE;
        break;
      case TASK_STATUS_FOCUS:
        newTaskState = TASK_STATUS_DONE;
        break;
      default:
        newTaskState = TASK_STATUS_IN_PROGRESS;
        break;
    }

    dispatch({
      type: UPDATE_TASK,
      task: {
        id: id,
        status: newTaskState,
        title: taskToUpdate.title,
        description: taskToUpdate.description,
      }
    });
  }

  function generateKey(prefix) {
    return `${prefix}_${new Date().getTime()}`;
  }

  const kanbanItemMethods = {
    deleteItem: deleteItem,
    progressItem: progressItem,
    updateItem: updateItem,
  }

  return (
    <div>
      <CurrentTask focusTask={focusTask} focus={focus} setFocus={setFocus} kanbanItemMethods={kanbanItemMethods} />
      <div className="flex flex-col md:flex-row lg:flex-row md:divide-x lg:divide-x divide-slate-600 overflow-x-scroll backdrop-blur-[22px] border-gray-500 border w-auto mx-3 p-2 py-6 rounded-lg md:mx-6 backdrop-brightness-[1.2] backdrop-contrast-[0.85]">
        <div className="flex flex-col md:w-1/2 mx-2">
          <h2 className="text-xl font-bold mx-4">
            to do
            {todos.length > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-lg font-semibold text-blue-800 bg-blue-200 rounded-full">
                {todos.length}
              </span>
            )}
          </h2>
          <ul id={TASK_STATUS_TODO} ref={todoList} className="p-4 pb-12 min-h-32 bg-gray-400/30 max-w-2xl mx-2 ml-4 my-4 rounded-lg">
            {todos.map((todo, index) => (
              <KanbanItem key={todo.id} task={todo} kanbanItemMethods={kanbanItemMethods} />
            ))}
          </ul>
          <div className="no-drag block max-w-2xl p-3 pl-4 mx-2 ml-4 mb-6 border-2 border-dotted border-gray-400 rounded-lg shadow hover:bg-gray-200 cursor-pointer bg-gray-300"
            onClick={() => addNewItem(TASK_STATUS_TODO)}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500">add new item</h5>
          </div>
        </div>

        <div className="flex flex-col md:w-1/2 mx-2">
          <h2 className="text-xl font-bold mx-4">
            in progress
            {inProgs.length > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-lg font-semibold text-blue-800 bg-blue-200 rounded-full">
                {inProgs.length}
              </span>
            )}
          </h2>
          <ul id={TASK_STATUS_IN_PROGRESS} ref={inProgressList} className="p-4 pb-12 min-h-32 bg-gray-400/30 max-w-2xl mx-2 ml-4 my-4 rounded-lg">
            {inProgs.map((inprog, index) => (
              <KanbanItem key={inprog.id} task={inprog} kanbanItemMethods={kanbanItemMethods} />
            ))}
          </ul>
          <div className="no-drag block max-w-2xl p-3 pl-4 mx-2 ml-4 mb-6 border-2 border-dotted border-gray-400 rounded-lg shadow hover:bg-gray-200 cursor-pointer bg-gray-300"
            onClick={() => addNewItem(TASK_STATUS_IN_PROGRESS)}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500">add new item</h5>
          </div>
        </div>

        <div className="flex flex-col md:w-1/2 mx-2">
          <h2 className="text-xl font-bold mx-4">
            done
            {dones.length > 0 && (
              <span className="inline-flex items-center justify-center w-6 h-6 ms-2 text-lg font-semibold text-teal-800 bg-teal-300 rounded-full">
                {dones.length}
              </span>
            )}
          </h2>
          <ul id={TASK_STATUS_DONE} ref={doneList} className="p-4 pb-12 min-h-32 bg-teal-400/30 max-w-2xl mx-2 ml-4 my-4 rounded-lg">
            {dones.map((doneTask, index) => (
              <KanbanItem key={doneTask.id} task={doneTask} kanbanItemMethods={kanbanItemMethods} style={'done'} />
            ))}
          </ul>
          <div className="no-drag block max-w-2xl p-3 pl-4 mx-2 ml-4 mb-6 border-2 border-dotted border-gray-400 rounded-lg shadow hover:bg-gray-200 cursor-pointer bg-gray-300"
            onClick={() => addNewItem(TASK_STATUS_DONE)}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500">add new item</h5>
          </div>
        </div>
      </div>
    </div>
  )
}
