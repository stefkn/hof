import { useState } from 'react';

export default function TaskList({
  tasks,
  onChangeTask,
  onDeleteTask
}) {
  return (
    <ul>
      {tasks.map(task => (
        <li key={task.id}>
          <Task
            task={task}
            onChange={onChangeTask}
            onDelete={onDeleteTask}
          />
        </li>
      ))}
    </ul>
  );
}

function Task({ task, onChange, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input
          class="py-2 w-32 rounded"
          value={task.text}
          onChange={e => {
            onChange({
              ...task,
              text: e.target.value
            });
          }} />
        <button onClick={() => setIsEditing(false)}
        class="h-8 mx-1 text-white bg-blue-400 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-lg shadow-lg">
          save
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        <p class="text-left w-64 break-words">{task.text}</p>
        <button onClick={() => setIsEditing(true)}
        class="h-8 mx-1 text-white bg-blue-400 border-0 py-1 px-3 focus:outline-none hover:bg-blue-500 rounded text-lg shadow-lg">
          edit
        </button>
      </>
    );
  }
  return (
    <label>
      <div class="py-2 my-2 w-full flex items-center justify-between rounded border border-gray-200 dark:border-gray-200 bg-slate-100 shadow-lg">
        <input
          type="checkbox"
          class="m-4 w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-100 focus:ring-blue-100 dark:focus:ring-blue-100 dark:ring-offset-gray-100 focus:ring-2 dark:bg-gray-100 dark:border-gray-100"
          checked={task.done}
          onChange={e => {
            onChange({
              ...task,
              done: e.target.checked
            });
          }}
        />
        {taskContent}
        <button onClick={() => onDelete(task.id)}
        class="h-8 mx-1 text-white bg-red-400 border-0 px-3 focus:outline-none hover:bg-red-500 rounded text-lg shadow-lg">
          delete
        </button>
      </div>
    </label>
  );
}
