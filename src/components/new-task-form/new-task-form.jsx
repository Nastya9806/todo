import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
    }
  }

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { description } = this.state
    this.setState({
      description: '',
    })
    if (description.length === 0) {
      return null
    } else {
      this.props.onAddItem(description.trim())
    }
  }

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input
          className='new-todo'
          value={this.state.description}
          onChange={this.onLabelChange}
          placeholder='What needs to be done?'
          autoFocus
        />
      </form>
    )
  }
}

NewTaskForm.defaultProps = {
  label: '',
}

NewTaskForm.propTypes = {
  label: PropTypes.string,
  onAddItem: PropTypes.func.isRequired,
}
