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


  return (
    <div>
    </div>
  )
}
