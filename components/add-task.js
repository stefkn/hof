import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <div class="w-full min-w-full flex">
      <input
        placeholder="Describe a task here"
        value={text}
        onChange={e => setText(e.target.value)}
        class="flex-grow mr-2 p-2"
      />
      <button
        onClick={() => {
            setText('');
            onAddTask(text);
        }}
        class="inline-flex text-white bg-green-400 border-0 py-1 px-3 focus:outline-none hover:bg-green-500 rounded text-lg shadow-lg"
      >Add</button>
    </div>
  )
}
