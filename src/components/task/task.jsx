import React, { useState, useEffect } from 'react'
import { formatDistanceToNow } from 'date-fns'

const Task = ({ isDone, description, created, onToggleDone, id, onTaskChange, onDeleted, timer, onTimer }) => {
  const [isEditing, setEditing] = useState(false)
  const [count, setTimer] = useState(null)

  const formatTime = () => {
    const min = Math.floor(timer / 60)
    const sec = timer % 60
    return isDone ? `${'0'}:${'00'}` : `${min}:${sec.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    return () => clearInterval(count)
  }, [count])

  const handleStart = () => {
    if (isDone || count) {
      return
    }

    setTimer(setInterval(onTimer, 1000, id))
  }

  const handleStop = () => {
    if (!count) {
      return
    }

    clearInterval(count)
    setTimer(null)
  }

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
            <button className='icon icon-play' onClick={() => handleStart(id)} />
            <button className='icon icon-pause' onClick={() => handleStop()} />
            {formatTime()}
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

export default Task
