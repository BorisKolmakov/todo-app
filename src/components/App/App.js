import React, { useState } from 'react'

import NewTaskForm from '../NewTaskForm'
import TaskList from '../TaskList'
import Footer from '../Footer'

import './App.css'

function App() {
  const [maxId, setMaxId] = useState(1)
  const [todoData, setTodoData] = useState([])
  const [activeFilter, setActiveFilter] = useState('all')

  const createTodoItem = (label, min = 1, sec = 7) => {
    setMaxId(maxId + 1)
    return {
      label: label,
      createTime: new Date(),
      completed: false,
      editing: false,
      id: maxId,
      minute: min,
      second: sec,
    }
  }

  const deleteTask = (id) => {
    setTodoData((todoData) => {
      const idx = todoData.findIndex((el) => el.id === id)
      const before = todoData.slice(0, idx)
      const after = todoData.slice(idx + 1)
      const newArray = [...before, ...after]
      return newArray
    })
  }

  const onTaskAdded = (label, min, sec) => {
    const item = createTodoItem(label, min, sec)
    setTodoData((todoData) => {
      return [...todoData, item]
    })
  }

  const toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((item) => item.id === id)
    const oldItem = arr[idx]

    const newItem = { ...oldItem, [propName]: !oldItem[propName] }
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const changeLabelTask = (arr, id, label) => {
    const idx = arr.findIndex((item) => item.id === id)
    const oldItem = arr[idx]
    const newItem = { ...oldItem, label: label }

    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)]
  }

  const onToggleCompleted = (id) => {
    setTodoData((todoData) => {
      return toggleProperty(todoData, id, 'completed')
    })
  }

  const editingTask = (id) => {
    setTodoData((todoData) => {
      return toggleProperty(todoData, id, 'editing')
    })
  }

  const editTask = (id, label) => {
    setTodoData((todoData) => {
      return changeLabelTask(todoData, id, label)
    })
    editingTask(id)
  }

  const taskFilter = () => {
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

  const btnFilter = (value) => {
    setActiveFilter(value)
  }

  const clearCompleted = () => {
    setTodoData((todoData) => {
      return todoData.filter((task) => !task.completed)
    })
  }

  const startTimer = (id) => {
    const { isTimerOn } = todoData.find((el) => el.id === id)

    if (!isTimerOn) {
      const timerId = setInterval(() => {
        setTodoData((prevData) => {
          const updateTodo = prevData.map((todoItem) => {
            if (todoItem.id === id) {
              if (todoItem.second === 0 && todoItem.minute === 0) {
                stopTimer(id)
              }
              let sec = todoItem.second - 1
              let min = todoItem.minute
              if (min > 0 && sec < 0) {
                min -= 1
                sec = 59
              }

              if (min === 0 && sec < 0) {
                sec = 0
                stopTimer(id)
              }

              return {
                ...todoItem,
                second: sec,
                minute: min,
              }
            }

            return todoItem
          })

          return updateTodo
        })
      }, 1000)
      setTodoData((todoData) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].timerId = timerId
        data[idx].isTimerOn = true

        return data
      })
    }
  }

  const stopTimer = (id) => {
    const { isTimerOn } = todoData.find((el) => el.id === id)
    if (isTimerOn) {
      const { timerId } = todoData.find((el) => el.id === id)
      setTodoData((todoData) => {
        const idx = todoData.findIndex((el) => el.id === id)
        const data = [...todoData]
        data[idx].isTimerOn = false

        return data
      })
      clearInterval(timerId)
    }
  }

  const filteredTodoData = taskFilter()
  const todoCount = todoData.filter((el) => !el.completed).length

  return (
    <React.StrictMode>
      <section className="todoapp">
        <header className="header">
          <h1>Todos</h1>
          <NewTaskForm onTaskAdded={onTaskAdded} />
        </header>
        <section className="main">
          <TaskList
            onDeleted={deleteTask}
            editTask={editTask}
            editingTask={editingTask}
            onToggleCompleted={onToggleCompleted}
            tasks={filteredTodoData}
            startTimer={startTimer}
            stopTimer={stopTimer}
          />
          <Footer toDo={todoCount} btnFilter={btnFilter} activeFilter={activeFilter} clearCompleted={clearCompleted} />
        </section>
      </section>
    </React.StrictMode>
  )
}

export default App
