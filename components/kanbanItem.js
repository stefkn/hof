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
    return (
        <div className={isDraggable ? "" : "no-drag"} draggable={isDraggable ? "true" : "false"}>
        </div>
    )
}
