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
  return (
    <div>
    </div>
  )
}
