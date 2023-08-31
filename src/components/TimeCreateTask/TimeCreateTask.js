import { Component } from 'react'
import { formatDistanceToNow } from 'date-fns'
import PropTypes from 'prop-types'

class TimeCreateTask extends Component {
  static defaultProps = {
    updateInterval: 30000,
  }

  static propTypes = {
    updateInterval: PropTypes.number,
  }

  state = {
    date: this.props.time,
  }

  componentDidMount() {
    const { updateInterval } = this.props
    this.timerID = setInterval(() => this.tick(), updateInterval)
  }

  componentWillUnmount() {
    clearInterval(this.timerID)
  }

  tick() {
    this.setState((state) => ({
      date: new Date(state.date),
    }))
  }

  render() {
    return formatDistanceToNow(this.state.date, {
      includeSeconds: true,
      addSuffix: true,
    })
  }
}

export { TimeCreateTask }
