import React, { Component } from 'react'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    const { onAddItem } = this.props

    this.state = {
      description: '',
    }

    this.onLabelChange = (e) => {
      this.setState({
        description: e.target.value,
      })
    }

    this.onSubmit = (e) => {
      e.preventDefault()
      const { description } = this.state
      this.setState({
        description: '',
      })
      onAddItem(description)
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className="new-todo"
          value={this.state.description}
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          autoFocus
        />
      </form>
    )
  }
}
