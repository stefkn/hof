import { useState } from 'react';
import KanbanItemModal from './kanbanItemModal';

export default function KanbanItem({ task, kanbanItemMethods, style }) {
    // thanks to https://stackoverflow.com/a/52855084
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches

    const [isOpen, setIsOpen] = useState(false);
    const [isEditable, setIsEditable] = useState(false);
    const [isDraggable, setIsDraggable] = useState(isTouchDevice ? false : true);

    function setIsDraggableIfNotTouch(value) {
        if (isTouchDevice) {
            return;
        }
        setIsDraggable(value);
    }

    const styleConfig = {
        done: 'bg-teal-100 dark:bg-teal-800 hover:bg-teal-200 dark:hover:bg-teal-800',
        expanded: 'bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 min-w-full h-full',
        expandedFocused: 'bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 min-w-full h-full animation-pulse',
        expandedFocusedInFocusMode: 'bg-indigo-100 dark:bg-indigo-900 hover:bg-indigo-200 dark:hover:bg-indigo-800 min-w-full h-96 animation-pulse'
    }

    function toggleOpenItem(id) {
        return () => {
            setIsOpen(!isOpen);
            setIsDraggableIfNotTouch(!isDraggable);
        }
    }

    function toggleEditable() {
        setIsEditable(!isEditable);
        setIsDraggableIfNotTouch(!isDraggable);
    }

    function handleSubmit(e) {
        e.preventDefault();
        const title = e.target.title.value;
        const description = e.target.description.value;
        kanbanItemMethods.updateItem(task.id, title, description);
        toggleOpenItem(task.id)();
    }

    return (
        <div className={isDraggable ? "" : "no-drag"} draggable={isDraggable ? "true" : "false"}>
            {isOpen ? (
                <KanbanItemModal task={task} kanbanItemMethods={kanbanItemMethods} toggleOpenItem={toggleOpenItem} />
            ) : (null)}
            <div
                className={"block max-w-2xl p-6 mb-2 bg-white border overflow-hidden border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 " + (styleConfig[style] || "")}
                data-label={task.title}
            >
                {isEditable ? (
                    <input defaultValue={task.title} type="text" id="title" className="block w-full p-2 mb-4 text-gray-900 border border-gray-300 rounded-lg bg-gray-50 text-base focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => { kanbanItemMethods.updateItem(task.id, e.target.value, task.description) }}></input>
                ) : (
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {task.title}
                    </h5>
                )}
                {isEditable ? (
                    <textarea id="description" rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        defaultValue={task.description}
                        onChange={(e) => { kanbanItemMethods.updateItem(task.id, task.title, e.target.value) }}></textarea>
                ) : (
                    <p className="font-normal text-gray-700 dark:text-gray-400">
                        {task.description}
                    </p>
                )}
                <div className="flex justify-between relative item-edit-buttons">
                    <div className="relative mt-10 mr-3 flex gap-2.5 justify-start z-10">
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={toggleEditable}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd" />
                                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Edit item</span>
                        </button>
                        <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            onClick={toggleOpenItem(task.id)}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 4h4m0 0v4m0-4-5 5M8 20H4m0 0v-4m0 4 5-5" />
                            </svg>
                            <span className="sr-only">Open item</span>
                        </button>
                    </div>
                    <div className="relative mt-10 flex gap-2.5 justify-end z-10">
                        <button type="button" className="text-white bg-violet-700 hover:bg-violet-800 focus:ring-4 focus:outline-none focus:ring-violet-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-0 dark:bg-violet-600 dark:hover:bg-violet-700 dark:focus:ring-violet-800"
                            onClick={() => {kanbanItemMethods.focusItem(task.id)}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-target"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
                            <span className="sr-only">Move to Focus</span>
                        </button>
                        <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-0 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
                            onClick={() => {kanbanItemMethods.progressItem(task.id)}}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
                            </svg>
                            <span className="sr-only">Move to next column</span>
                        </button>
                        <button type="button" className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm p-2 text-center inline-flex items-center me-0 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-800"
                            onClick={() => {kanbanItemMethods.deleteItem(task.id)}}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M8.586 2.586A2 2 0 0 1 10 2h4a2 2 0 0 1 2 2v2h3a1 1 0 1 1 0 2v12a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V8a1 1 0 0 1 0-2h3V4a2 2 0 0 1 .586-1.414ZM10 6h4V4h-4v2Zm1 4a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Zm4 0a1 1 0 1 0-2 0v8a1 1 0 1 0 2 0v-8Z" clipRule="evenodd" />
                            </svg>
                            <span className="sr-only">Move to trash</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
