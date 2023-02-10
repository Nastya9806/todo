import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

const Footer = ({ activeCount, onFilter, clearCompleted, filter }) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>{activeCount()} items left</span>
      <TasksFilter filter={filter} onFilter={onFilter} />
      <button onClick={clearCompleted} className='clear-completed'>
        Clear completed
      </button>
    </footer>
  )
}

Footer.propTypes = {
  onFilter: PropTypes.func.isRequired,
  clearCompleted: PropTypes.func.isRequired,
  activeCount: PropTypes.func.isRequired,
}

export default Footer
