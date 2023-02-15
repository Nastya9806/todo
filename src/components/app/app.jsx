import React, { Component } from 'react'
import { v4 as uuidv4 } from 'uuid'

import './app.css'
import NewTaskForm from '../new-task-form/new-task-form'
import TaskList from '../task-list/task-list'
import Footer from '../footer/footer'

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      taskData: [],
      filter: 'all',
    }
  }

  createTodoItem = (description, timer) => {
    return {
      description,
      isDone: false,
      created: new Date(),
      id: uuidv4(),
      timer,
    }
  }

  onTimer = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const task = taskData[idx]
      const newItem = { ...task, timer: task.timer - 1 }
      const newArray = [...taskData.slice(0, idx), newItem, ...taskData.slice(idx + 1)]
      return {
        taskData: newArray,
      }
    })
  }

  onAddItem = (label, timer) => {
    const newTask = this.createTodoItem(label, timer)
    this.setState((state) => {
      const newData = [...state.taskData, newTask]
      return { taskData: newData }
    })
  }

  deleteItem = (id) => {
    this.setState(({ taskData }) => {
      const idx = taskData.findIndex((el) => el.id === id)
      const newData = [...taskData.slice(0, idx), ...taskData.slice(idx + 1)]
      return {
        taskData: newData,
      }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id)
    const oldItem = arr[idx]
    const value = !oldItem[propName]
    const item = { ...arr[idx], [propName]: value }

    return [...arr.slice(0, idx), item, ...arr.slice(idx + 1)]
  }

  onToggleDone = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.taskData, id, 'isDone')
      return { taskData: items }
    })
  }

  activeCount = () => {
    return this.state.taskData.filter((el) => !el.isDone).length
  }

  onFilter = (filter) => {
    this.setState({ filter })
  }

  clearCompleted = () => {
    const activeData = this.state.taskData.filter((el) => !el.isDone)
    this.setState({
      taskData: activeData,
    })
  }

  onTaskChange = (description, id) => {
    this.setState(({ taskData }) => {
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
    const { taskData, filter } = this.state
    return (
      <div>
        <section className='todoapp'>
          <header className='header'>
            <h1>todos</h1>
            <NewTaskForm onAddItem={this.onAddItem} />
          </header>
          <section className='main'>
            <TaskList
              taskData={taskData}
              onDeleted={this.deleteItem}
              onToggleDone={this.onToggleDone}
              filter={filter}
              onTaskChange={this.onTaskChange}
              toggleProperty={this.toggleProperty}
              onTimer={this.onTimer}
            />
            <Footer
              activeCount={this.activeCount}
              filter={filter}
              onFilter={this.onFilter}
              clearCompleted={this.clearCompleted}
            />
          </section>
        </section>
      </div>
    )
  }
}
