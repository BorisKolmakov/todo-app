import React, { useState } from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { formatDistanceToNow } from 'date-fns'

import styles from './Task.css'

const cx = classNames.bind(styles)

function Task(props) {
  const {
    onDeleted,
    onToggleCompleted,
    completed,
    editing,
    id,
    label,
    editingTask,
    editTask,
    createTime,
    startTimer,
    stopTimer,
    minute,
    second,
  } = props

  const [stateLabel, setStateLabel] = useState(label)

  const onChange = (evt) => {
    setStateLabel(evt.target.value)
  }

  const onSubmit = (evt) => {
    evt.preventDefault()

    if (stateLabel.trim()) {
      editTask(stateLabel.trim(), id)
    }
  }

  const escFunction = (evt) => {
    if (evt.key === 'Escape') {
      setStateLabel(label)
      editingTask(id)
    }
  }

  const blurFunction = () => {
    setStateLabel(label)
    editingTask(id)
  }

  let btnClass = cx({
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
        <span className="description">created {formatDistanceToNow(createTime)}</span>
        <button className="icon icon-edit" onClick={editingTask}></button>
        <button className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      {editing && (
        <form onSubmit={onSubmit}>
          <input
            type="text"
            className="edit"
            value={stateLabel}
            autoFocus
            onChange={onChange}
            onKeyDown={escFunction}
            onBlur={blurFunction}
          />
        </form>
      )}
    </li>
  )
}

export default Task

Task.defaultProps = {
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

Task.propTypes = {
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
