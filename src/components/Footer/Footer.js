import React from 'react'
import PropTypes from 'prop-types'

import './Footer.css'
import TaskFilter from '../TaskFilter'

function Footer(props) {
  const { toDo, activeFilter, btnFilter, clearCompleted } = props

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

export default Footer

Footer.defaultProps = {
  toDo: 0,
  btnFilter: () => {},
  clearCompleted: () => {},
}

Footer.propTypes = {
  toDo: PropTypes.number,
  btnFilter: PropTypes.func,
  clearCompleted: PropTypes.func,
}
