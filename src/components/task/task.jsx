import React, { Component } from 'react'
import PropTypes, { objectOf } from 'prop-types'
import { formatDistanceToNow } from 'date-fns'

import Timer from '../timer/timer'

export default class Task extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isEditing: false,
    }
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
    const { isDone, visible, id } = this.props
    let className = ''
    if (isEditing) {
      className += ' editing'
    }
    if (isDone) {
      className += ' completed'
    }
    if (!visible.some((el) => el.id === id)) {
      className = 'hidden'
    }
    return className
  }

  render() {
    const { onToggleDone, id, isDone, description, created, onDeleted, onTaskChange, timer, onTimer } = this.props
    return (
      <li className={this.classNames()}>
        <div className='view'>
          <input className='toggle' type='checkbox' onChange={() => onToggleDone(id)} checked={isDone} />
          <div className='label'>
            <span className='title'>{description}</span>
            <Timer onTimer={() => onTimer(id)} id={id} isDone={isDone} timer={timer} />
            <span className='description'>{formatDistanceToNow(created)}</span>
          </div>

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
  id: PropTypes.string.isRequired,
  visible: PropTypes.arrayOf(objectOf).isRequired,
}
