import React, { Component } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

import { TimeCreateTask } from '../TimeCreateTask'

import styles from './Task.css'

const cx = classNames.bind(styles)

class Task extends Component {
  static defaultProps = {
    completed: false,
    editing: false,
    id: 1,
    label: '',
    createTime: new Date(),
    min: 0,
    sec: 0,
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
    min: PropTypes.number,
    sec: PropTypes.number,
  }

  state = {
    label: this.props.label,
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

  escFunction = (evt) => {
    if (evt.key === 'Escape') {
      const { editingTask, id } = this.props
      this.setState({ label: this.props.label })
      editingTask(id)
    }
  }

  blurFunction = () => {
    const { editingTask, id } = this.props
    this.setState({ label: this.props.label })
    editingTask(id)
  }

  render() {
    const {
      onDeleted,
      onToggleCompleted,
      completed,
      editing,
      id,
      editingTask,
      createTime,
      startTimer,
      stopTimer,
      minute,
      second,
    } = this.props
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
          <span className="description">
            <button className="icon icon-play" onClick={startTimer}></button>
            <button className="icon icon-pause" onClick={stopTimer}></button>
            {minute < 10 ? `0${minute}` : minute}:{second < 10 ? `0${second}` : second}
          </span>
          <span className="description">
            created <TimeCreateTask time={createTime} />
          </span>
          <button className="icon icon-edit" onClick={editingTask}></button>
          <button className="icon icon-destroy" onClick={onDeleted}></button>
        </div>
        {editing && (
          <form onSubmit={this.onSubmit}>
            <input
              type="text"
              className="edit"
              value={this.state.label}
              autoFocus
              onChange={this.onChange}
              onKeyDown={this.escFunction}
              onBlur={this.blurFunction}
            />
          </form>
        )}
      </li>
    )
  }
}

export default Task
