import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './new-task-form.css'

export default class NewTaskForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      description: '',
      min: '',
      sec: '',
    }
  }

  onLabelChange = (e, prop) => {
    this.setState({
      [prop]: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    const { description, min, sec } = this.state
    const timer = min * 60 + parseInt(sec, 10)
    if (description.trim().length === 0 || isNaN(min) || isNaN(sec) || !(min && sec)) {
      return
    } else {
      this.props.onAddItem(description.trim(), timer)
      this.setState({
        description: '',
        min: '',
        sec: '',
      })
    }
  }

  render() {
    const { min, sec, description } = this.state
    return (
      <form className='new-todo-form' onSubmit={this.onSubmit}>
        <input
          className='new-todo'
          value={description}
          onChange={(e) => this.onLabelChange(e, 'description')}
          placeholder='What needs to be done?'
          autoFocus
          name='description'
        />
        <input
          className='new-todo-form__timer'
          placeholder='Min'
          value={min}
          onChange={(e) => this.onLabelChange(e, 'min')}
          name='min'
        />
        <input
          className='new-todo-form__timer'
          placeholder='Sec'
          value={sec}
          onChange={(e) => this.onLabelChange(e, 'sec')}
          name='sec'
        />
        <input type='submit' className='submit-button' />
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
