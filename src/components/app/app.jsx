import React, { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'

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
    this.maxId = 100
  }

  createTodoItem = (description) => {
    return {
      description,
      isDone: false,
      isEditing: false,
      created: `created ${formatDistanceToNow(new Date())}`,
      id: ++this.maxId,
    }
  }

  onAddItem = (label) => {
    this.setState((state) => {
      const item = this.createTodoItem(label)
      return { taskData: [...state.taskData, item] }
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

  onSetEditing = (id) => {
    this.setState((state) => {
      const items = this.toggleProperty(state.taskData, id, 'isEditing')
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

  onEditing = (description, id) => {
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

  closeEditing = (id) => {
    this.setState(({ taskData }) => {
      const index = taskData.findIndex((el) => el.id === id)
      const editingItem = {
        ...taskData[index],
        isEditing: false,
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
          <NewTaskForm onAddItem={this.onAddItem} />
          <section className='main'>
            <TaskList
              taskData={taskData}
              onDeleted={this.deleteItem}
              onToggleDone={this.onToggleDone}
              onSetEditing={this.onSetEditing}
              filter={filter}
              onEditing={this.onEditing}
              toggleProperty={this.toggleProperty}
              closeEditing={this.closeEditing}
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
