import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './todo-list.css'

const TaskList = ({ taskData, onTaskChange, onToggleDone, onDeleted, filter }) => {
  const elements = taskData.map((item) => {
    if ((filter === 'Completed' && !item.isDone) || (filter === 'Active' && item.isDone)) {
      return null
    }
    return (
      <Task
        {...item}
        id={item.id}
        key={item.id}
        onToggleDone={onToggleDone}
        onTaskChange={onTaskChange}
        onDeleted={onDeleted}
      />
    )
  })

  return <ul className='todo-list'>{elements}</ul>
}

TaskList.propTypes = {
  onToggleDone: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
}

export default TaskList
