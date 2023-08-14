import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './NewTaskForm.css'

class NewTaskForm extends Component {
  static defaultProps = {
    onTaskAdded: () => {},
  }

  static propTypes = {
    onTaskAdded: PropTypes.func,
  }

  state = {
    label: '',
  }

  onLabelChange = (e) => {
    this.setState({
      label: e.target.value,
    })
  }

  onSubmit = (e) => {
    e.preventDefault()
    this.props.onTaskAdded(this.state.label)
    this.setState({
      label: '',
    })
  }

  render() {
    return (
      <form className="new-todo-form" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          placeholder="What needs to be done?"
          onChange={this.onLabelChange}
          value={this.state.label}
        />
      </form>
    )
  }
}

export default NewTaskForm
