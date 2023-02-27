import React, { useState, useEffect } from 'react'

const Timer = ({ timer, onTimer, id }) => {
  const [count, setTimer] = useState(null)

  const formatTime = () => {
    const min = Math.floor(timer / 60)
    const sec = timer % 60
    return `${min}:${sec.toString().padStart(2, '0')}`
  }

  useEffect(() => {
    if (timer <= 0) {
      clearInterval(count)
    }
  }, [timer])

  const handleStart = () => {
    if (count) {
      return
    }
    if (!count && timer > 0) {
      setTimer(setInterval(onTimer, 1000, id))
    }
  }

  const handleStop = () => {
    if (!count) {
      return
    }
  }
  return (
    <>
      <button className='icon icon-play' onClick={() => handleStart(id)} />
      <button className='icon icon-pause' onClick={() => handleStop()} />
      {formatTime()}
    </>
  )
}

export default Timer
