import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

const TaskList = ({ tasks, onDeleted, onToggleCompleted, editTask, editingTask }) => {
  const elements = tasks.map((item) => {
    const { ...itemProps } = item
    return (
      <Task
        key={item.id}
        {...itemProps}
        onDeleted={() => onDeleted(item.id)}
        editTask={(label) => editTask(item.id, label)}
        editingTask={() => editingTask(item.id)}
        onToggleCompleted={() => onToggleCompleted(item.id)}
      />
    )
  })

  return <ul className="todo-list">{elements}</ul>
}

TaskList.defaultProps = {
  tasks: [],
  onToggleCompleted: () => {},
  onDeleted: () => {},
  editingTask: () => {},
  editTask: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  onToggleCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
  editingTask: PropTypes.func,
  editTask: PropTypes.func,
}

export default TaskList
