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
    setTaskData((prevState) => prevState.filter((t) => t.id !== id))
  }

  const onToggleDone = (id) => {
    setTaskData((prevState) => prevState.map((t) => (t.id === id ? { ...t, isDone: !t.isDone } : t)))
  }

  const activeCount = () => {
    const active = taskData.filter((el) => !el.isDone).length
    return `${active} items left`
  }

  // const [filter, setFilter] = useState('All');
  // // const [filter, setFilter] = useState(defFilters)
  // const onFilter = (selectedFilter) => {
  //   setFilter(selectedFilter)
  // }
  const clearCompleted = () => {
    const activeData = taskData.filter((el) => !el.isDone)
    setTaskData(activeData)
  }

  const onTaskChange = (description, id) => {
    setTaskData((prevState) => prevState.map((t) => (t.id === id ? { ...t, description: description } : t)))
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
