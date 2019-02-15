import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
          <div id="countdown">
            <div id="countdown-number"></div>
            <svg>
              <circle r="18" cx="20" cy="20"></circle>
            </svg>
          </div>
      </div>
    );
  }
}

export default App;
