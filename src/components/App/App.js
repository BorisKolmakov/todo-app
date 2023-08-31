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
    minute: '',
    second: '',
  }

  createTodoItem(label, min = 1, sec = 7) {
    return {
      label: label,
      createTime: new Date(),
      completed: false,
      editing: false,
      id: this.maxId++,
      minute: min,
      second: sec,
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

  startTimer = (id) => {
    const { isTimerOn } = this.state.todoData.find((el) => el.id === id)

    if (!isTimerOn) {
      const timerId = setInterval(() => {
        this.setState((prevState) => {
          const updateTodo = prevState.todoData.map((todoItem) => {
            if (todoItem.id === id) {
              if (todoItem.second === 0 && todoItem.minute === 0) {
                this.stopTimer(id)
              }
              let sec = todoItem.second - 1
              let min = todoItem.minute
              if (min > 0 && sec < 0) {
                min -= 1
                sec = 59
              }

              if (min === 0 && sec < 0) {
                sec = 0
                this.stopTimer(id)
              }

              return {
                ...todoItem,
                second: sec,
                minute: min,
              }
            }

            return todoItem
          })

          return {
            todoData: updateTodo,
          }
        })
      }, 1000)
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].timerId = timerId
        data[idx].isTimerOn = true

        return {
          todoData: data,
        }
      })
    }
  }

  stopTimer = (id) => {
    const { isTimerOn } = this.state.todoData.find((el) => el.id === id)
    if (isTimerOn) {
      const { timerId } = this.state.todoData.find((el) => el.id === id)
      this.setState(({ todoData }) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].isTimerOn = false

        return {
          todoData: data,
        }
      })
      clearInterval(timerId)
    }
  }

  render() {
    const { todoData, activeFilter } = this.state
    const filteredTodoData = this.taskFilter()
    const todoCount = todoData.filter((el) => !el.completed).length
    return (
      <React.StrictMode>
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
              startTimer={this.startTimer}
              stopTimer={this.stopTimer}
            />
            <Footer
              toDo={todoCount}
              btnFilter={this.btnFilter}
              activeFilter={activeFilter}
              clearCompleted={this.clearCompleted}
            />
          </section>
        </section>
      </React.StrictMode>
    )
  }
}

export default App
