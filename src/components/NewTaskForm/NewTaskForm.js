import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

function NewTaskForm({ onTaskAdded }) {
  const [label, setLabel] = useState('')
  const [minute, setMinute] = useState('')
  const [second, setSecond] = useState('')

  const onLabelChange = (e) => {
    const inputFiledName = e.target.placeholder
    switch (inputFiledName) {
      case 'Min':
        setMinute(e.target.value)
        break
      case 'Sec':
        setSecond(e.target.value)
        break
      default:
        setLabel(e.target.value)
        break
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    if (label.trim()) {
      onTaskAdded(label.trim(), minute, second)
      setLabel('')
      setMinute('')
      setSecond('')
    }
  }

  return (
    <form className="new-todo-form" onSubmit={onSubmit}>
      <input
        type="text"
        className="new-todo"
        placeholder="What needs to be done?"
        onChange={onLabelChange}
        value={label}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        value={minute}
        onChange={onLabelChange}
        placeholder="Min"
        required
        min={0}
        max={60}
      />
      <input
        type="number"
        className="new-todo-form__timer"
        value={second}
        onChange={onLabelChange}
        placeholder="Sec"
        required
        min={0}
        max={60}
      />
      <button type="submit"></button>
    </form>
  )
}

export default NewTaskForm

NewTaskForm.defaultProps = {
  onTaskAdded: () => {},
}

NewTaskForm.propTypes = {
  onTaskAdded: PropTypes.func,
}
