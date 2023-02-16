import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({ isDone, description, created, onToggleDone, id, onTaskChange, onDeleted }) => {
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
          <span className='description'>{description}</span>
          <span className='created'>{formatDistanceToNow(created)}</span>
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

export default Task
