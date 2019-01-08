import React, { Component } from 'react';
import './Timer.css';

class Timer extends Component {
  componentWillMount() {
    this.resetTimer();
  };

  resetTimer() {
    this.setState({
      minutes: this.props.sessionLength,
      seconds: 0,
      status: 'stopped',
      warning: false
    });
  }

  executeTimerCycle = () => {
    let minutes = this.state.minutes;
    let seconds = this.state.seconds - 1;
    if (seconds === -1) {
      seconds = 5; // TODO: 59
      minutes -= 1;
    }
    const status = minutes === 0 && seconds === 0 ? 'stopped' : 'active';
    this.setState(Object.assign({}, this.state, {
      minutes: minutes,
      seconds: seconds,
      warning: minutes <= this.props.warningLength,
      status: status
    }));

    if (status === 'stopped') {
      clearInterval(this.forceUpdateInterval);
    }
  };

  startTimer = () => {
    this.forceUpdateInterval = setInterval(() => {
      this.executeTimerCycle();
    }, 1000);
  };

  stopTimer = () => {
    clearInterval(this.forceUpdateInterval);
  };

  renderTime = (number) => (
    number < 10 ? `0${number}` : `${number}`
  );

  handleClick = () => {
    if (this.state.status === 'active') {
      this.stopTimer();
      this.setState(Object.assign({}, this.state, { status: 'paused'}));
    } else if (this.state.status === 'stopped') {
      this.startTimer();
    }
  };

  handleStop = () => {
    this.resetTimer();
  };

  handleResume = () => {
    this.executeTimerCycle();
    this.startTimer();
  };

  render() {
    if (this.state.status === 'paused') return (
      <div className="timer-paused">
        <button
          className="cancel-btn"
          onClick={this.handleStop}>Stop</button>
        <button
          className="resume-btn"
          onClick={this.handleResume}>Resume</button>
      </div>
    );
    if (this.state.status === 'stopped' && this.state.minutes !== this.props.sessionLength) {
      this.resetTimer();
    }
    let classes = 'timer';
    if (this.state.status === 'active') {
      if (this.state.minutes < this.props.warningLength) {
        classes += ' warning';
      }
    }
    return (
      <div className={classes} onClick={this.handleClick}>
      <span className="timer-legend">
        {this.renderTime(this.state.minutes)}
        :
        {this.renderTime(this.state.seconds)}</span>
      </div>
    );
  }
}

export default Timer;