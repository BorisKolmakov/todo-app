import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './Footer.css'
import TaskFilter from '../TaskFilter'

class Footer extends Component {
  static defaultProps = {
    toDo: 0,
    btnFilter: () => {},
    clearCompleted: () => {},
  }

  static propTypes = {
    toDo: PropTypes.number,
    btnFilter: PropTypes.func,
    clearCompleted: PropTypes.func,
  }

  render() {
    const { toDo, activeFilter, btnFilter, clearCompleted } = this.props
    return (
      <footer className="footer">
        <span className="todo-count">{toDo} items left</span>
        <TaskFilter btnFilter={btnFilter} activeFilter={activeFilter} />
        <button className="clear-completed" onClick={clearCompleted}>
          Clear completed
        </button>
      </footer>
    )
  }
}

export default Footer
