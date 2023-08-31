import React from 'react'
import PropTypes from 'prop-types'

import Task from '../Task'

import './TaskList.css'

class TaskList extends React.Component {
  state = {
    minute: this.props.minute,
    second: this.props.second,
  }

  render() {
    const { tasks, onDeleted, onToggleCompleted, editTask, editingTask, startTimer, stopTimer } = this.props
    const elements = tasks.map((item) => {
      const { ...itemProps } = item
      return (
        <Task
          key={item.id}
          minute={item.minute}
          second={item.second}
          {...itemProps}
          onDeleted={() => onDeleted(item.id)}
          editTask={(label) => editTask(item.id, label)}
          editingTask={() => editingTask(item.id)}
          onToggleCompleted={() => onToggleCompleted(item.id)}
          startTimer={() => startTimer(item.id)}
          stopTimer={() => stopTimer(item.id)}
        />
      )
    })

    return <ul className="todo-list">{elements}</ul>
  }
}

TaskList.defaultProps = {
  tasks: [],
  onToggleCompleted: () => {},
  onDeleted: () => {},
  editingTask: () => {},
  editTask: () => {},
  startTimer: () => {},
  stopTimer: () => {},
}

TaskList.propTypes = {
  tasks: PropTypes.array,
  onToggleCompleted: PropTypes.func,
  onDeleted: PropTypes.func,
  editingTask: PropTypes.func,
  editTask: PropTypes.func,
  startTimer: PropTypes.func,
  stopTimer: PropTypes.func,
}

export default TaskList
