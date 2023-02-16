import React from 'react'

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

export default Footer
