import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

const NewTaskForm = ({ onAddItem }) => {
  const [description, setDescription] = useState('')
  const [min, setMin] = useState('')
  const [sec, setSec] = useState('')

  const onSubmit = (e) => {
    e.preventDefault()
    const timer = min * 60 + parseInt(sec, 10)

    if (description.trim().length === 0 || isNaN(min) || isNaN(sec) || !(min && sec) || min < 0 || sec < 0) {
      return
    } else {
      onAddItem(description.trim(), timer)
      setDescription('')
      setMin('')
      setSec('')
    }
  }

  return (
    <form className='new-todo-form' onSubmit={onSubmit}>
      <input
        className='new-todo'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder='What needs to be done?'
        autoFocus
        name='description'
      />
      <input
        className='new-todo-form__timer'
        placeholder='Min'
        value={min}
        onChange={(e) => setMin(e.target.value)}
        name='min'
      />
      <input
        className='new-todo-form__timer'
        placeholder='Sec'
        value={sec}
        onChange={(e) => setSec(e.target.value)}
        name='sec'
      />
      <input type='submit' className='submit-button' />
    </form>
  )
}

NewTaskForm.defaultProps = {
  label: '',
}

NewTaskForm.propTypes = {
  label: PropTypes.string,
  onAddItem: PropTypes.func.isRequired,
}

export default NewTaskForm
