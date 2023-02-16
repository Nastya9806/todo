import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'
import './app.css'

import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

const App = () => {
  const [taskData, setTaskData] = useState([])
  const [filter, setFilter] = useState('')
  const createTodoItem = (description) => {
    return {
      description,
      isDone: false,
      created: new Date(),
      id: uuidv4(),
    }
  }

  const onAddItem = (label) => {
    const item = createTodoItem(label)
    setTaskData((prevState) => [...prevState, item])
  }

  const deleteItem = (id) => {
    setTaskData((prevState) => prevState.filter((item) => item.id !== id))
  }

  const onToggleDone = (id) => {
    setTaskData((prevState) => prevState.map((item) => (item.id === id ? { ...item, isDone: !item.isDone } : item)))
  }

  const activeCount = () => {
    const active = taskData.filter((item) => !item.isDone).length
    return `${active} items left`
  }

  const clearCompleted = () => {
    const activeData = taskData.filter((el) => !el.isDone)
    setTaskData(activeData)
  }

  const onTaskChange = (description, id) => {
    setTaskData((prevState) => prevState.map((item) => (item.id === id ? { ...item, description: description } : item)))
  }

  return (
    <div>
      <section className='todoapp'>
        <NewTaskForm onAddItem={onAddItem} />
        <section className='main'>
          <TaskList
            taskData={taskData}
            onDeleted={deleteItem}
            onToggleDone={onToggleDone}
            onTaskChange={onTaskChange}
            filter={filter}
          />
          <Footer activeCount={activeCount} filter={filter} onFilter={setFilter} clearCompleted={clearCompleted} />
        </section>
      </section>
    </div>
  )
}

export default App
