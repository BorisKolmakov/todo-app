import React from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

function TasksFilter(props) {
  const { activeFilter, btnFilter } = props

  const filters = [
    { label: 'all', selected: true },
    { label: 'active', selected: false },
    { label: 'completed', selected: false },
  ]

  const buttons = filters.map(({ label }) => {
    const isActive = activeFilter === label
    const classFilter = isActive ? 'selected' : null
    return (
      <li key={label}>
        <button className={classFilter} onClick={() => btnFilter(label)}>
          {label.charAt(0).toUpperCase() + label.slice(1)}
        </button>
      </li>
    )
  })

  return <ul className="filters">{buttons}</ul>
}

export default TasksFilter

TasksFilter.defaultProps = {
  btnFilter: () => {},
}

TasksFilter.propTypes = {
  activeFilter: PropTypes.string,
  btnFilter: PropTypes.func.isRequired,
}
