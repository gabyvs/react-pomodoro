import React, { Component } from 'react';
import Pomodoro from '../Pomodoro/Pomodoro';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Pomodoro />
      </div>
    );
  }
}

export default App;
