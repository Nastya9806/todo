import React, { Component } from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      count: null,
    }
  }

  componentDidUpdate(prevProps) {
    const { timer } = this.props
    const { count } = this.state
    if (prevProps.timer !== timer && timer <= 0) {
      clearInterval(count)
    }
  }

  handleStart = () => {
    const { count } = this.state
    const { timer, id, onTimer } = this.props
    if (!count && timer > 0) {
      const timeInt = setInterval(() => {
        onTimer(id)
      }, 1000)
      this.setState({
        count: timeInt,
      })
    }
  }

  handleStop = () => {
    const { count } = this.state
    clearInterval(count)
    this.setState({
      count: null,
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
