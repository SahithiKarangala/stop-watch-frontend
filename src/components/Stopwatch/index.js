import {Component} from 'react'
import './index.css'

const initialState = {
  startSeconds: 0,
  started: false,
}

class Stopwatch extends Component {
  state = initialState

  clearTimerInterval = () => {
    clearInterval(this.intervalId)
  }

  incrementSeconds = () => {
    const {started} = this.state

    if (started) {
      this.setState(prevState => ({startSeconds: prevState.startSeconds + 1}))
    } else {
      this.clearTimerInterval()
      this.setState({started: false})
    }
  }

  onStartTime = () => {
    const {started} = this.state
    if (started) {
      this.clearTimerInterval()
    } else {
      this.intervalId = setInterval(this.incrementSeconds, 1000)
    }
    this.setState({started: true})
  }

  onStopTime = () => {
    this.clearTimerInterval()
    this.setState({started: false})
  }

  onRest = () => {
    this.clearTimerInterval()
    this.setState(initialState)
  }

  getTimeOnStopWatch = () => {
    const {startSeconds} = this.state
    const totalMinutes = Math.floor(startSeconds / 60)
    const totalSeconds = Math.floor(startSeconds % 60)
    const stringifiedMinutes =
      totalMinutes > 9 ? totalMinutes : `0${totalMinutes}`
    const stringifiedSeconds =
      totalSeconds > 9 ? totalSeconds : `0${totalSeconds}`

    return `${stringifiedMinutes}:${stringifiedSeconds}`
  }

  render() {
    const {started} = this.state
    const disabledButton = started
    console.log(disabledButton)
    return (
      <div className="app-container">
        <div className="card-container">
          <h1 className="main-heading">Stopwatch</h1>
          <div className="time-card-container">
            <div className="timer-card-header">
              <img
                className="stop-watch-img"
                src="https://assets.ccbp.in/frontend/react-js/stopwatch-timer.png"
                alt="stopwatch"
              />
              <p className="timer-card-heading">Timer</p>
            </div>
            <h1>{this.getTimeOnStopWatch()}</h1>

            <div className="buttons-container">
              <button
                type="button"
                className="operations-buttons start"
                onClick={this.onStartTime}
                disabled={disabledButton}
              >
                Start
              </button>
              <button
                type="button"
                className="operations-buttons stop"
                onClick={this.onStopTime}
                disabled={!disabledButton}
              >
                Stop
              </button>
              <button
                type="button"
                className="operations-buttons reset"
                onClick={this.onRest}
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Stopwatch
