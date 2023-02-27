import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../timer/timer'

const Task = ({ isDone, description, created, onToggleDone, id, onTaskChange, onDeleted, timer, onTimer }) => {
  const [isEditing, setEditing] = useState(false)

  const classNames = () => {
    let className = ''
    if (isEditing) {
      className += 'editing'
    }
    if (isDone && !isEditing) {
      className += 'completed'
    }
    return className
  }

  return (
    <li className={classNames()}>
      <div className='view'>
        <input className='toggle' type='checkbox' onChange={() => onToggleDone(id)} checked={isDone} />
        <label>
          <span className='title'>{description}</span>
          <span className='description'>
            <Timer onTimer={onTimer} id={id} timer={timer} />
          </span>
          <span className='description'>{formatDistanceToNow(created)}</span>
        </label>
        <button className='icon icon-edit' onClick={() => setEditing(true)}></button>
        <button className='icon icon-destroy' onClick={() => onDeleted(id)}></button>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setEditing(false)
        }}
      >
        <input
          type='text'
          className='edit'
          onChange={(event) => onTaskChange(event.target.value, id)}
          value={description}
        />
      </form>
    </li>
  )
}

Task.defaultProps = {
  description: '',
}

Task.propTypes = {
  description: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}

export default Task
