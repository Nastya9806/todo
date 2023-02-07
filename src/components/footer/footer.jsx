import React from 'react'

import TasksFilter from '../tasks-filter/tasks-filter'
import './footer.css'

const Footer = ({ activeCount, onFilter, clearCompleted, filter }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{activeCount()} items left</span>
      <TasksFilter filter={filter} onFilter={onFilter} />
      <button onClick={clearCompleted} className="clear-completed">
        Clear completed
      </button>
    </footer>
  )
}

export default Footer
