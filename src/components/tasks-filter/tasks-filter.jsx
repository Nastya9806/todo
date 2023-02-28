import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './tasks-filter.css'

export default class TasksFilter extends Component {
  buttons = [
    { name: 'all', label: 'All' },
    { name: 'active', label: 'Active' },
    { name: 'done', label: 'Completed' },
  ]

  render() {
    const { filter, onFilter } = this.props
    const buttons = this.buttons.map(({ name, label }) => (
      <li key={name}>
        <button type='button' className={filter === name ? 'selected' : null} onClick={() => onFilter(name)}>
          {label}
        </button>
      </li>
    ))
    return <ul className='filters'>{buttons}</ul>
  }
}
TasksFilter.defaultProps = {
  filter: 'all',
  onFilter: () => {},
}

TasksFilter.propTypes = {
  filter: PropTypes.oneOf(['all', 'active', 'done']),
  onFilter: PropTypes.func,
}
