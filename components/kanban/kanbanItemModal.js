export default function KanbanItemModal({ task, kanbanItemMethods, toggleOpenItem }) {

    return (
        <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
            <div className="relative w-11/12 max-w-2xl p-6 bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-gray-800 dark:border-gray-700">
                <button className="absolute top-0 right-0 p-2 m-2 text-2xl text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200" onClick={toggleOpenItem(task.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {task.title}
                </h5>
                <p className="text-gray-700 dark:text-gray-400">{task.description}</p>
                <div className="flex justify-between mt-6">
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700" onClick={toggleOpenItem(task.id)}>
                        Close
                    </button>
                    <button className="px-4 py-2 text-sm font-semibold text-white bg-red-500 rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700" onClick={() => {kanbanItemMethods.deleteItem(task.id)}}>
                        Delete
                    </button>
                </div>
            </div>
        </div>
    )
}