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


  return (
    <div>
    </div>
  )
}
