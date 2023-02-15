import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

export default class Task extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isEditing: false,
      count: null,
    }
  }

  formatTime = () => {
    const { timer, isDone } = this.props
    const min = Math.floor(timer / 60)
    const sec = timer % 60
    return isDone ? `${'0'}:${'00'}` : `${min}:${sec.toString().padStart(2, '0')}`
  }

  componentWillUnmount() {
    this.handleStop()
  }

  handleStart = () => {
    const { timer, isDone, onTimer } = this.props
    const { count } = this.state
    if (!count && timer > 0 && !isDone) {
      this.setState({
        count: setInterval(() => {
          onTimer()
        }, 1000),
      })
    }
  }

  componentDidUpdate = (prevProps) => {
    const { timer } = this.props
    const { count } = this.state
    if (prevProps.timer !== timer && timer <= 0) {
      clearInterval(count)
    }
  }

  handleStop = () => {
    const { count } = this.state
    clearInterval(count)
    this.setState({
      count: null,
    })
  }

  onSetEditing = () => {
    this.setState({
      isEditing: true,
    })
  }

  closeEditing = () => {
    this.setState({
      isEditing: false,
    })
  }

  classNames = () => {
    const { isEditing } = this.state
    const { isDone } = this.props
    let className = 'task'
    if (isEditing) className += ' editing'
    if (isDone) className += ' completed'
    return className
  }

  onEditing = (description, id) => {
    this.setState((taskData) => {
      const index = taskData.findIndex((el) => el.id === id)
      const editingItem = {
        ...taskData[index],
        description,
      }
      const newData = [...taskData.slice(0, index), editingItem, ...taskData.slice(index + 1)]
      return {
        taskData: newData,
      }
    })
  }

  render() {
    const { id, description, isDone, created, onToggleDone, onDeleted, onTaskChange } = this.props
    return (
      <li className={this.classNames()}>
        <div className='view'>
          <input className='toggle' type='checkbox' onChange={() => onToggleDone(id)} checked={isDone} />
          <label>
            <span className='title'>{description}</span>
            <span className='description'>
              <button onClick={this.handleStart} className='icon icon-play' />
              <button onClick={this.handleStop} className='icon icon-pause' />
              {this.formatTime()}
            </span>
            <span className='description'>{formatDistanceToNow(created)}</span>
          </label>
          <button className='icon icon-edit' onClick={() => this.onSetEditing(id)}></button>
          <button className='icon icon-destroy' onClick={() => onDeleted(id)}></button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault()
            this.closeEditing()
          }}
        >
          <input
            type='text'
            className='edit'
            value={description}
            onChange={(event) => onTaskChange(event.target.value, id)}
          />
        </form>
      </li>
    )
  }
}

Task.defaultProps = {
  description: '',
}

Task.propTypes = {
  description: PropTypes.string,
  onDeleted: PropTypes.func.isRequired,
  onToggleDone: PropTypes.func.isRequired,
}
