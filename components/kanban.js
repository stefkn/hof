import React from 'react';
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import KanbanItem from './kanbanItem';
import CurrentTask from './currentTask';

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

  function progressItem(id) {
    // TODO: refactor this to use a single state object
    return () => {
      const todo = todos.find(todo => todo.id === id);
      const inProg = inProgs.find(inprog => inprog.id === id);
      const done = dones.find(done => done.id === id);
      const focusItem = focus.find(focus => focus.id === id);
      if (todo) {
        setTodos(todos.filter(todo => todo.id !== id));
        setInProgs([...inProgs, todo]);
      } else if (inProg) {
        setInProgs(inProgs.filter(inprog => inprog.id !== id));
        setDones([...dones, inProg]);
      } else if (done) {
        setDones(dones.filter(done => done.id !== id));
        setTodos([...todos, done]);
      } else if (focusItem) {
        setFocus(focus.filter(focus => focus.id !== id));
        setDones([...dones, focusItem]);
      }
    }
  }

  function updateItem(id, title, description) {
    return () => {
      const newTodos = todos.map(todo => {
        if (todo.id === id) {
          return {
            ...todo,
            title,
            description,
          }
        }
        return todo;
      });
      const newInProgs = inProgs.map(inprog => {
        if (inprog.id === id) {
          return {
            ...inprog,
            title,
            description,
          }
        }
        return inprog;
      });
      const newDones = dones.map(done => {
        if (done.id === id) {
          return {
            ...done,
            title,
            description,
          }
        }
        return done;
      });
      const newFocus = focus.map(focus => {
        if (focus.id === id) {
          return {
            ...focus,
            title,
            description,
          }
        }
        return focus;
      });
      setTodos(newTodos);
      setInProgs(newInProgs);
      setDones(newDones);
      setFocus(newFocus);
    }
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
          <ul ref={todoList} className="p-4">
            {todos.map((todo, index) => (
              <KanbanItem key={todo.id} task={todo} kanbanItemMethods={kanbanItemMethods} />
            ))}
          </ul>
          <div className="no-drag block max-w-2xl p-3 pl-4 mx-2 ml-4 mb-6 border-2 border-dotted border-gray-400 rounded-lg shadow hover:bg-gray-200 cursor-pointer bg-gray-300"
            onClick={() => addNewItem(todo)}>
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
          <ul ref={inProgressList} className="p-4">
            {inProgs.map((inprog, index) => (
              <KanbanItem key={inprog.id} task={inprog} kanbanItemMethods={kanbanItemMethods} />
            ))}
          </ul>
          <div className="no-drag block max-w-2xl p-3 pl-4 mx-2 ml-4 mb-6 border-2 border-dotted border-gray-400 rounded-lg shadow hover:bg-gray-200 cursor-pointer bg-gray-300"
            onClick={() => addNewItem(inProgress)}>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500">add new item</h5>
          </div>
        </div>

      </div>
    </div>
  )
}
