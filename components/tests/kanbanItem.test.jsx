import React from "react";
import KanbanItem from "../kanban/kanbanItem.jsx";
import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'

const mockTask = {
  id: 1,
  title: 'Home',
  description: 'Go home',
  status: 'todo',
  priority: 'low',
  dueDate: '2021-12-31'
}

const mockKanbanItemMethods = {
  updateTask: () => {},
  deleteTask: () => {},
}

test('KanbanItem', () => {
  // render(<KanbanItem task={mockTask} kanbanItemMethods={mockKanbanItemMethods} style={null} />)
  // expect(screen.getByRole('heading', { level: 1, name: 'Home' })).toBeDefined()
})
