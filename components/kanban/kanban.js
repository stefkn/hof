import { useReducer, useEffect, useState } from 'react';
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import KanbanItem from './kanbanItem';
import CurrentTask from './currentTask';
import tasksReducer from '../../lib/state/tasksReducer';
import {
  TASK_STATUS_TODO,
  TASK_STATUS_IN_PROGRESS,
  TASK_STATUS_DONE,
  TASK_STATUS_FOCUS,
} from '../../lib/state/taskStatuses';
import { ADD_TASK, REMOVE_TASK, UPDATE_TASK } from '../../lib/state/actions';

export default function Kanban({ kanbanItems }) {
  const todo = 'todo'
  const inProgress = 'in-progress'
  const done = 'done'

  const config = {
    group: "todoList",
    sortable: true,
    draggable: (el) => !el.classList.contains("no-drag"),
  }

  const [todoList, todos, setTodos] = useDragAndDrop([], config);
  const [inProgressList, inProgs, setInProgs] = useDragAndDrop([], config);
  const [doneList, dones, setDones] = useDragAndDrop([], config);
  const [focusTask, focus, setFocus] = useDragAndDrop([], {
    ...config,
    accepts: (_parent, lastParent) => {
      return focus.length === 0;
    }
  });

  function addNewItem(type) {
    const currentIndex = todos.length + inProgs.length + dones.length + focus.length + 1;
    const newTodo = {
      id: generateKey(currentIndex),
      title: `New Item ${currentIndex}`,
      description: 'Description',
    };
    if (!newTodo) { return; }
    switch (type) {
      case todo:
        setTodos([...todos, newTodo]);
        return;
      case inProgress:
        setInProgs([...inProgs, newTodo]);
        return;
      case done:
        setDones([...dones, newTodo]);
        return;
    }
  }

  function deleteItem(id) {
    return () => {
      // TODO: refactor this to use a single state object
      const newTodos = todos.filter(todo => todo.id !== id);
      const newInProgs = inProgs.filter(inprog => inprog.id !== id);
      const newDones = dones.filter(done => done.id !== id);
      const newFocus = focus.filter(focus => focus.id !== id);
      setTodos(newTodos);
      setInProgs(newInProgs);
      setDones(newDones);
      setFocus(newFocus);
    }
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
