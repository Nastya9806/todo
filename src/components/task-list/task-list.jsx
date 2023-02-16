import React from 'react'

import Task from '../task/task'
import './todo-list.css'

const TaskList = ({ taskData, onToggleDone, onTaskChange, onDeleted, filter }) => {
  const elements = taskData.map((item) => {
    const { isDone } = item
    if ((filter === 'Completed' && !isDone) || (filter === 'Active' && isDone)) {
      return null
    }

    return (
      <Task
        {...item}
        id={item.id}
        key={item.id}
        // item={...item}
        isDone={isDone}
        onToggleDone={onToggleDone}
        onTaskChange={onTaskChange}
        onDeleted={onDeleted}
      />
    )
  })

  return <ul className='todo-list'>{elements}</ul>
}

export default TaskList
