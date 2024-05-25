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
                <div id="defaultTabContent">
                    <div
                        className={"p-4 bg-white rounded-lg md:p-8 dark:bg-slate-900/70 flex flex-col justify-between md:flex-row md:justify-between md:items-start " + (openTab === focusTaskTab ? '' : 'hidden')}
                        id="focustask"
                        role="tabpanel"
                        aria-labelledby="focus-task-tab"
                    >
                        <div className="w-full min-w-16 mr-8">
                            <h5 className="mb-4 ml-0 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                                focus task
                            </h5>
                            {focus.length === 0 && (
                                <p className="mb-4 font-normal text-gray-700 dark:text-gray-400">
                                    Welcome! Create and drag a task here, or use the focus button on a task, to get started.
                                </p>
                            )}
                            <ul ref={focusTask}>
                                {focus.map((todo, index) => (
                                    <KanbanItem key={todo.id} task={todo} kanbanItemMethods={kanbanItemMethods} style={'expanded'} /> 
                                ))}
                                {focus.length === 0 && (
                                    <div className="no-drag block max-w-2xl p-3 pl-4 m-0 border-2 border-dotted border-gray-400 rounded-lg shadow">
                                        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-500">
                                            focus task here
                                        </h5>
                                    </div>
                                )}
                            </ul>
                        </div>
                        <div className="w-full">
                            <Countdown disabled={focus.length === 0} />
                        </div>
                    </div>
            </div>
        </div>
    )
}