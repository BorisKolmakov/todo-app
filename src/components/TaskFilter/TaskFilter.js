import { Component } from 'react'
import PropTypes from 'prop-types'
import './TaskFilter.css'

class TasksFilter extends Component {
  static defaultProps = {
    btnFilter: () => {},
  }

  static propTypes = {
    activeFilter: PropTypes.string,
    btnFilter: PropTypes.func.isRequired,
  }

  filters = [
    { label: 'all', selected: true },
    { label: 'active', selected: false },
    { label: 'completed', selected: false },
  ]
  render() {
    const { activeFilter, btnFilter } = this.props

    const buttons = this.filters.map(({ label }) => {
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
}

export default TasksFilter
