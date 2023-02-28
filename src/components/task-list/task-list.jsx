import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './todo-list.css'

const TaskList = ({ taskData, onToggleDone, onTaskChange, onDeleted, filter, onTimer, onSetTimer, visible }) => {
  const elements = taskData.map((item) => {
    const { isDone, timer } = item
    if ((filter === 'Completed' && !isDone) || (filter === 'Active' && isDone)) {
      return null
    }

    return (
      <Task
        {...item}
        id={item.id}
        key={item.id}
        isDone={isDone}
        onToggleDone={onToggleDone}
        onTaskChange={onTaskChange}
        onDeleted={onDeleted}
        onTimer={onTimer}
        timer={timer}
        onSetTimer={onSetTimer}
        visible={visible}
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
