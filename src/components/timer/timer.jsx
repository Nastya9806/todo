import React, { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      timerId: null,
    }
  }

  componentDidUpdate(prevProps) {
    const { timer, isDone } = this.props
    const { timerId } = this.state
    if (prevProps.timer !== timer && timer <= 0) {
      clearInterval(timerId)
    }
    if (isDone !== prevProps.isDone) {
      this.handleStop()
    }
  }

  componentWillUnmount() {
    this.handleStop()
  }

  handleStart = () => {
    const { timerId } = this.state
    const { timer, id, onTimer, isDone } = this.props

    if (!timerId && timer > 0 && !isDone) {
      this.setState({
        timerId: setInterval(() => {
          onTimer(id)
        }, 1000),
      })
    } else {
      return
    }
  }

  handleStop = () => {
    const { timerId } = this.state
    clearInterval(timerId)
    this.setState({
      timerId: null,
    })
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
