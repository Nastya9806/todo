import React, { Component } from 'react'
import './tasks-filter.css'

export default class TasksFilter extends Component {
  constructor(props) {
    super(props)
    this.selected = 'selected'
    this.state = {
      filter: props.filter,
    }

    this.getButton = () => {
      return document.querySelectorAll('.filters button')
    }

    this.onClick = (e) => {
      if (e.target.classList.contains(this.selected)) {
        return
      }
      const buttons = this.getButton()
      for (let button of buttons) {
        button.classList.remove(this.selected)
      }
      e.target.classList.add(this.selected)
      this.props.onFilter(e.target.textContent)
    }
  }

  render() {
    return (
      <ul className="filters">
        <li>
          <button className="selected" onClick={this.onClick}>
            All
          </button>
        </li>
        <li>
          <button onClick={this.onClick}>Active</button>
        </li>
        <li>
          <button onClick={this.onClick}>Completed</button>
        </li>
      </ul>
    )
  }
}
