import React from 'react'
import PropTypes from 'prop-types'

import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

const Footer = ({ clearCompleted, activeCount, onFilter, filter }) => {
  return (
    <footer className='footer'>
      <span className='todo-count'>{activeCount()}</span>
      <TasksFilter onFilter={onFilter} filter={filter} />
      <button className='clear-completed' onClick={() => clearCompleted()}>
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
