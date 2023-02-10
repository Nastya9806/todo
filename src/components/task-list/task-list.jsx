import React from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task'
import './todo-list.css'

const TaskList = ({ taskData, closeEditing, onEditing, onToggleDone, onSetEditing, onDeleted, filter }) => {
  const elements = taskData.map((item) => {
    if ((filter === 'Completed' && !item.isDone) || (filter === 'Active' && item.isDone)) {
      return null
    }
    const inputField = item.isEditing ? (
      <form
        onSubmit={(e) => {
          e.preventDefault()
          closeEditing(item.id)
        }}
      >
        <input
          type='text'
          className='edit'
          value={item.description}
          onChange={(event) => onEditing(event.target.value, item.id)}
        />
      </form>
    ) : null
    let classNames = ''
    if (item.isDone) {
      classNames += ' completed'
    }
    if (item.isEditing) {
      classNames += ' editing'
    }

    return (
      <li className={classNames} key={item.id}>
        <Task
          {...item}
          onToggleDone={onToggleDone}
          onSetEditing={onSetEditing}
          onDeleted={onDeleted}
          closeEditing={closeEditing}
        />
        {inputField}
      </li>
    )
  })

  return <ul className='todo-list'>{elements}</ul>
}

TaskList.propTypes = {
  onToggleDone: PropTypes.func.isRequired,
  onSetEditing: PropTypes.func.isRequired,
  onDeleted: PropTypes.func.isRequired,
  closeEditing: PropTypes.func.isRequired,
}

export default TaskList
