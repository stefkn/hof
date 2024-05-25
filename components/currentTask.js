import React, { useState } from 'react';
import KanbanItem from './kanbanItem';
import Countdown from './countdown';

export default function CurrentTask({ focusTask, focus, setFocus, kanbanItemMethods }) {

    const focusTaskTab = 'focus-task'
    const timeTrackingTab = 'time-tracking'
    const statisticsTab = 'statistics'

    const [openTab, setOpenTab] = useState(focusTaskTab)

    return (
        <div>
            <div className="my-8 mt-4 w-auto bg-white border border-gray-200 rounded-lg shadow dark:bg-slate-900/70 dark:border-gray-700 md:m-6 lg:m-6 w-auto mx-3 backdrop-blur-[22px]">
                <ul
                    className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 rounded-t-lg bg-gray-50 dark:border-gray-700 dark:text-gray-400 dark:bg-gray-800"
                    id="defaultTab"
                    data-tabs-toggle="#defaultTabContent"
                    role="tablist"
                >
                    <li className="me-2">
                        <button
                            id="focus-task-tab"
                            data-tabs-target="#focus-task"
                            type="button"
                            role="tab"
                            aria-controls="focus-task"
                            aria-selected={openTab === focusTaskTab ? 'true' : 'false'}
                            className={"inline-block p-4 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 " + (openTab === focusTaskTab ? 'text-blue-600 dark:text-blue-500' : '')}
                            onClick={() => setOpenTab(focusTaskTab)}
                        >
                            focus task
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            id="time-tracking-tab"
                            data-tabs-target="#time-tracking"
                            type="button"
                            role="tab"
                            aria-controls="time-tracking"
                            aria-selected={openTab === timeTrackingTab ? 'true' : 'false'}
                            className={"inline-block p-4 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 " + (openTab === timeTrackingTab ? 'text-blue-600 dark:text-blue-500' : '')}
                            onClick={() => setOpenTab(timeTrackingTab)}
                        >
                            time tracking
                        </button>
                    </li>
                    <li className="me-2">
                        <button
                            id="statistics-tab"
                            data-tabs-target="#statistics"
                            type="button"
                            role="tab"
                            aria-controls="statistics"
                            aria-selected={openTab === statisticsTab ? 'true' : 'false'}
                            className={"inline-block p-4 rounded-ss-lg hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700 " + (openTab === statisticsTab ? 'text-blue-600 dark:text-blue-500' : '')}
                            onClick={() => setOpenTab(statisticsTab)}
                        >
                            statistics
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    )
}