import React, { Component } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

class App extends Component {
  maxId = 1
  state = {
    todoData: [],
    activeFilter: 'all',
  }

  createTodoItem(label) {
    return {
      label: label,
      createTime: new Date(),
      completed: false,
      editing: false,
      id: this.maxId++,
    }
  }

  deleteTask = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const before = todoData.slice(0, idx)
      const after = todoData.slice(idx + 1)
      const newArray = [...before, ...after]
      return {
        todoData: newArray,
      }
    })
  }

  onTaskAdded = (label) => {
    this.setState((state) => {
      const item = this.createTodoItem(label)
      return { todoData: [...state.todoData, item] }
    })
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id)
    const oldItem = arr[idx]

    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  changeLabelTask = (arr, id, label) => {
    console.log(id)
    const idx = arr.findIndex((item) => item.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, label: label }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  onToggleCompleted = (id) => {
    this.setState((state) => ({
      todoData: this.toggleProperty(state.todoData, id, 'completed'),
    }))
  }

  editingTask = (id) => {
    this.setState((state) => {
      return {
        todoData: this.toggleProperty(state.todoData, id, 'editing'),
      }
    })
  }

  editTask = (id, label) => {
    this.setState((state) => {
      return {
        todoData: this.changeLabelTask(state.todoData, id, label),
      }
    })
    this.editingTask(id)
  }

  taskFilter = () => {
    const { activeFilter, todoData } = this.state

    switch (activeFilter) {
      case 'all':
        return todoData
      case 'active':
        return todoData.filter((task) => !task.completed)

      case 'completed':
        return todoData.filter((task) => task.completed)
      default:
        return todoData
    }
  }

  btnFilter = (value) => {
    this.setState({ activeFilter: value })
  }

  clearCompleted = () => {
    this.setState((state) => ({
      todoData: state.todoData.filter((task) => !task.completed),
    }))
  }

  render() {
    const { todoData, activeFilter } = this.state
    const filteredTodoData = this.taskFilter()
    const completedCount = todoData.filter((el) => el.completed).length
    const todoCount = todoData.length - completedCount
    return (
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onTaskAdded={this.onTaskAdded} />
        </header>
        <section className="main">
          <TaskList
            onDeleted={this.deleteTask}
            editTask={this.editTask}
            editingTask={this.editingTask}
            onToggleCompleted={this.onToggleCompleted}
            tasks={filteredTodoData}
          />
          <Footer
            toDo={todoCount}
            completed={completedCount}
            btnFilter={this.btnFilter}
            activeFilter={activeFilter}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </section>
    )
  }
}

export default App
