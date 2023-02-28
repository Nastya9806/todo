import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      isRunning: false,
    }

    this.handleStart = () => {
      const { isDone, timer, onTimer } = this.props
      const { isRunning } = this.state
      if (!isDone && timer > 0 && !isRunning) {
        this.setState({
          isRunning: true,
        })
        this.timerId = setInterval(() => onTimer(), 1000)
      }
    }

    this.handleStop = () => {
      this.setState({
        isRunning: false,
      })
    }
  }

  componentDidMount() {
    this.setState({
      isRunning: false,
    })
  }

  componentDidUpdate(prevProps) {
    const { isRunning } = this.state
    const { timer, isDone } = this.props
    if (prevProps.timer !== timer && timer <= 0) {
      clearInterval(this.timerId)
    }
    if (isDone !== prevProps.isDone) {
      this.handleStop()
    }
    if (!isRunning) {
      clearInterval(this.timerId)
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerId)
  }

  formatTime = () => {
    const { timer } = this.props
    const min = Math.floor(timer / 60)
    const sec = timer % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  render() {
    return (
      <span className='description'>
        <button className='icon icon-play' onClick={this.handleStart} />
        <button className='icon icon-pause' onClick={this.handleStop} />
        {this.formatTime()}
      </span>
    )
  }
}

Timer.defaultProps = {
  onTimer: () => {},
}

Timer.propTypes = {
  timer: PropTypes.number.isRequired,
  onTimer: PropTypes.func,
}
