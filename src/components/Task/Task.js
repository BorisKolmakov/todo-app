import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { TimeCreateTask } from '../TimeCreateTask'
import { Timer } from '../Timer'

import styles from './Task.css'

const cx = classNames.bind(styles)

class Task extends Component {
  static defaultProps = {
    completed: false,
    editing: false,
    id: 1,
    label: '',
    createTime: new Date(),
    onToggleCompleted: () => {},
    editingTask: () => {},
    onDeleted: () => {},
  }

  static propTypes = {
    completed: PropTypes.bool,
    editing: PropTypes.bool,
    id: PropTypes.number,
    description: PropTypes.string,
    createTime: PropTypes.instanceOf(Date),
    onToggleCompleted: PropTypes.func,
    editingTask: PropTypes.func,
    onDeleted: PropTypes.func,
  }

  state = {
    label: this.props.label,
  }

  componentDidMount() {
    this.interval
  }

  onChange = (evt) => {
    this.setState({ label: evt.target.value })
  }

  onSubmit = (evt) => {
    evt.preventDefault()
    const { editTask, id } = this.props
    const { label } = this.state

    if (label.trim()) {
      editTask(label.trim(), id)
    }
  }

  render() {
    const { onDeleted, onToggleCompleted, completed, editing, id, editingTask, createTime, timer, updateTaskTimer } =
      this.props
    const { label } = this.state
    const btnClass = cx({
      '': true,
      completed: completed,
      editing: editing,
    })
    return (
      <li className={btnClass}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            id={`${id}___check`}
            onChange={onToggleCompleted}
            checked={completed}
          />
          <label htmlFor={`${id}__check`} onClick={onToggleCompleted}>
            <span className="title">{label}</span>
          </label>
          <Timer {...timer} updateTaskTimer={updateTaskTimer} id={id} />
          <span className="description">
            created <TimeCreateTask time={createTime} />
          </span>
          <button className="icon icon-edit" onClick={editingTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing ? (
          <form onSubmit={this.onSubmit}>
            <input type="text" className="edit" value={this.state.label} autoFocus onChange={this.onChange} />
          </form>
        ) : null}
      </li>
    )
  }
}

export default Task
