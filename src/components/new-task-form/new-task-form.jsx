import React, { useState } from 'react'
import './new-task-form.css'

const NewTaskForm = ({ onAddItem }) => {
  const [description, setDescription] = useState('')

  const onLabelChange = (e) => {
    setDescription(e.target.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setDescription('')
    if (description.trim().length === 0) {
      return
    } else {
      onAddItem(description.trim())
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <input
        className='new-todo'
        value={description}
        onChange={onLabelChange}
        placeholder='What needs to be done?'
        autoFocus
      />
    </form>
  )
}

export default NewTaskForm
