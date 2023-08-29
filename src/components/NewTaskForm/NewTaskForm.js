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
    min: '',
    sec: '',
  }

  onLabelChange = (e) => {
    const inputFiledName = e.target.placeholder
    switch (inputFiledName) {
      case 'Min':
        this.setState({ min: e.target.value })
        break
      case 'Sec':
        this.setState({ sec: e.target.value })
        break
      default:
        this.setState({ label: e.target.value })
        break
    }
  }

  onSubmit = (e) => {
    e.preventDefault()
    if (this.state.label) {
      this.props.onTaskAdded(this.state.label, this.state.min, this.state.sec)
      this.setState({
        label: '',
        min: '',
        sec: '',
      })
    }
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
        <input
          type="number"
          className="new-todo-form__timer"
          value={this.state.min}
          onChange={this.onLabelChange}
          placeholder="Min"
          required
          min={0}
          max={60}
        />
        <input
          type="number"
          className="new-todo-form__timer"
          value={this.state.sec}
          onChange={this.onLabelChange}
          placeholder="Sec"
          required
          min={0}
          max={60}
        />
        <button type="submit"></button>
      </form>
    )
  }
}

export default NewTaskForm
