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

  createTodoItem(label, min = 1, sec = 7) {
    return {
      label: label,
      createTime: new Date(),
      completed: false,
      editing: false,
      id: this.maxId++,
      timer: {
        minute: min,
        second: sec,
      },
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

  onTaskAdded = (label, min, sec) => {
    this.setState((state) => {
      const item = this.createTodoItem(label, min, sec)
      return { todoData: [...state.todoData, item] }
    })
    console.log(label, min, sec)
  }

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id)
    const oldItem = arr[idx]

    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  changeLabelTask = (arr, id, label) => {
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

  updateTaskTimer = (id, minute, second) => {
    if (minute >= 0 && second > 0) {
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const oldItem = todoData[idx]
        const newItem = { ...oldItem, timer: { minute, second } }

        return { todoData: [...todoData.slice(0, idx), newItem, ...todoData.slice(idx + 1)] }
      })
    } else {
      this.setState(({ todoData }) => {
        return {
          todoData: this.toggleProperty(todoData, id, 'completed'),
        }
      })
    }
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
    const todoCount = todoData.filter((el) => !el.completed).length
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
            updateTaskTimer={this.updateTaskTimer}
          />
          <Footer
            toDo={todoCount}
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
