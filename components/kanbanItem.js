import { useState } from 'react';

export default function KanbanItem({ task, kanbanItemMethods, style }) {

    const [isOpen, setIsOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isDraggable, setIsDraggable] = useState(true);

    const styleConfig = {
        done: 'bg-teal-100 dark:bg-teal-800 hover:bg-teal-200 dark:hover:bg-teal-800',
        expanded: 'bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 min-w-full h-full'
    }

    function toggleOpenItem(id) {
        return () => {
            setIsOpen(!isOpen);
            setIsDraggable(!isDraggable);
        }
    }

    function toggleEditable() {
        setIsEditable(!isEditable);
        setIsDraggable(!isDraggable);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        kanbanItemMethods.updateItem(task.id, title, description)();
        toggleOpenItem(task.id)();
    }

    return (
        <div className={isDraggable ? "" : "no-drag"} draggable={isDraggable ? "true" : "false"}>
            <div
                className={"block max-w-2xl p-6 mb-2 bg-white border overflow-hidden border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 " + (styleConfig[style] || "")}
                data-label={task.title}
            >
                {isEditable ? (
                    <input defaultValue={task.title} type="text" id="title" className="block w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => { kanbanItemMethods.updateItem(task.id, e.target.value, task.description)() }}></input>
                ) : (
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {task.title}
                    </h5>
                )}
                {isEditable ? (
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={task.description}
                        onChange={(e) => { kanbanItemMethods.updateItem(task.id, task.title, e.target.value)() }}></textarea>
                ) : (
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {task.description}
                    </p>
                )}
            </div>
        </div>
    )
}
