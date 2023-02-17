import React from 'react'
import PropTypes from 'prop-types'
import './tasks-filter.css'

const classSelected = 'selected'
const TasksFilter = ({ onFilter }) => {
  const getButton = () => {
    return document.querySelectorAll('.filters button')
  }

  const onClick = (e) => {
    if (e.target.classList.contains(classSelected)) {
      return
    }
    const buttons = getButton()
    for (let button of buttons) {
      button.classList.remove(classSelected)
    }
    e.target.classList.add(classSelected)
    onFilter(e.target.textContent)
  }
  return (
    <ul className='filters'>
      <li>
        <button className='selected' onClick={onClick}>
          All
        </button>
      </li>
      <li>
        <button onClick={onClick}>Active</button>
      </li>
      <li>
        <button onClick={onClick}>Completed</button>
      </li>
    </ul>
  )
}

TasksFilter.propTypes = {
  onFilter: PropTypes.func.isRequired,
}
export default TasksFilter
