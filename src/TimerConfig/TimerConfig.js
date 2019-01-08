import React from 'react';
import './TimerConfig.css';

const TimerConfig = (props) => (
  <div className="timer-config">
    <div className="timer-config-legend">{props.title}</div>
    <div className="timer-config-time">{props.length}</div>
    <div className="timer-config-buttons">
      <button
        className="timer-config-button"
        onClick={props.decrease}>-</button>
      <button
        className="timer-config-button"
        onClick={props.increase}>+</button>
    </div>
  </div>
);

export default TimerConfig;