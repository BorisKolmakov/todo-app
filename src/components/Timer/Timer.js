import React, { Component } from 'react'

class Timer extends Component {
  state = {
    minute: this.props.minute,
    second: this.props.second,
    startedTimer: false,
  }

  componentDidMount() {
    this.interval
  }

  componentWillUnmount() {
    clearInterval(this.interval)
  }

  componentDidUpdate() {
    if (this.state.minute == 0 && this.state.second == 0) {
      clearInterval(this.interval)
    }
  }

  startTimer = () => {
    this.setState({ startedTimer: true })
    this.interval = setInterval(() => {
      this.setState(({ minute, second }) => {
        let nexMinute = second == 0 ? minute - 1 : minute
        let nextSecond = second > 0 ? second - 1 : 59
        this.props.updateTaskTimer(this.props.id, nexMinute, nextSecond)
        return {
          minute: nexMinute,
          second: nextSecond,
        }
      })
    }, 1000)
  }

  stopTimer = () => {
    this.setState({ startedTimer: false })
    clearInterval(this.interval)
  }

  render() {
    const { minute, second, startedTimer } = this.state

    return (
      <span className="description">
        <button className="icon icon-play" onClick={!startedTimer ? this.startTimer : () => {}}></button>
        <button className="icon icon-pause" onClick={this.stopTimer}></button>
        {`${minute}:${second < 10 ? '0' + second : second}`}
      </span>
    )
  }
}

export { Timer }
