import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './todo-list.css'

const TaskList = ({ taskData, onToggleDone, onTaskChange, onDeleted, filter, play, pause, tick, onTimer }) => {
  const elements = taskData.map((item) => {
    if ((filter === 'Completed' && !item.isDone) || (filter === 'Active' && item.isDone)) {
      return null
    }

    const { id } = item
    return (
      <Task
        id={item.id}
        {...item}
        key={item.id}
        onToggleDone={onToggleDone}
        onDeleted={onDeleted}
        play={play}
        pause={pause}
        tick={tick}
        onTaskChange={onTaskChange}
        onTimer={() => onTimer(id)}
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
