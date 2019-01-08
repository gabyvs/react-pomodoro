import React, { Component } from 'react';
import './Pomodoro.css';
import TimerConfig from '../TimerConfig/TimerConfig';
import Timer from '../Timer/Timer';

class Pomodoro extends Component {
  state = {
    sessionLength: 25,
    warningLength: 5
  };

  handleIncrease = (timerName) => {
    if (this.state[timerName] === 60) return;
    const newState = Object.assign({}, this.state);
    newState[timerName] = this.state[timerName] + 1;
    if (timerName === 'warningLength' && newState.warningLength > newState.sessionLength) {
      newState.sessionLength++;
    }
    this.setState(newState);
  };

  handleDecrease = (timerName) => {
    if (this.state[timerName] === 1) return;
    const newState = Object.assign({}, this.state);
    newState[timerName] = this.state[timerName] - 1;
    if (timerName === 'sessionLength' && newState.warningLength > newState.sessionLength) {
      newState.warningLength--;
    }
    this.setState(newState);
  };

  render() {
    return (
      <div className="pomodoro">
        <div className="pomodoro-legend">Pomodoro Timer</div>
        <hr className="pomodoro-separator"/>
        <div className="timers">
          <TimerConfig
            title={'Session Length'}
            length={this.state.sessionLength}
            decrease={() => this.handleDecrease('sessionLength')}
            increase={() => this.handleIncrease('sessionLength')} />
          <TimerConfig
            title={'Warning Length'}
            length={this.state.warningLength}
            decrease={() => this.handleDecrease('warningLength')}
            increase={() => this.handleIncrease('warningLength')} />
        </div>
        <Timer
          sessionLength={this.state.sessionLength}
          warningLength={this.state.warningLength} />
      </div>
    );
  }
}

export default Pomodoro;