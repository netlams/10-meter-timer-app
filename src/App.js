import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App container-fluid">
          <Timer />
          <TrialTable />
      </div>
    );
  }
}

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      isTiming: false,
    };
  }

  countdown() {
    let {isTiming} = this.state;
    if (!isTiming) { 
      this.start(Date.now());
      console.log("Started");
    }
    else {
      this.stop();
      console.log("Stopped");
    }
  }

  start(startTime) {
    let {elapsed, isTiming, timerStartTime} = this.state;
    console.log(elapsed);


    this.timer = 
      setInterval(() => {
        elapsed = new Date() - startTime;

        this.setState({
          elapsed: elapsed,
          isTiming: true
        });
      }, 50);
  }

  stop() {
    let {elapsed, isTiming} = this.state;

    this.setState({
      isTiming: false
    });
    clearInterval(this.timer);
  }

  reset() {
    let {elapsed, isTiming} = this.state;

    this.setState({
      elapsed: 0,
      isTiming: false
    });
  }

  renderCountdown() {
    // Calculate elapsed to tenth of a second:
    var elapsed = Math.round(this.state.elapsed / 100);

    // This will give a number with one digit after the decimal dot (xx.x):
    var seconds = (elapsed / 10).toFixed(1);  
    return <div>{seconds} seconds</div>;
  }

  render() {

    let startBtn = (!this.state.isTiming) ? 
      <button type="button" className="btn btn-light" 
        onClick={() => this.countdown()}>Start</button> : null;

    let stopBtn = (this.state.isTiming) ? 
      <button type="button" className="btn btn-warning"
        onClick={() => this.stop()}>Stop</button> : null;

    return (
      <div id="countdown" className="container">
        <div id="countdown-number">{this.renderCountdown()}</div>
        <svg onClick={() => this.countdown()}>
          <circle className={this.state.isTiming ? 'spinning' : ''} r="100" cx="101" cy="101"></circle>
        </svg>
        <div/>
       {startBtn}
       {stopBtn}
      </div>
      );
  }
}

class TrialTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0
    };
  }

  render() {
    let todayDate = new Date();

    return(
      <div id="trial-table" className="container white-bg">
        <div className="row">
          <div id="date" className="col-sm"><span >Date</span>: {todayDate.getMonth()}/{todayDate.getDate()}</div>
        </div>

          <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item">
              <a class="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Self-Selected Velocity</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" id="profile-tab" data-toggle="tab" href="#profile" role="tab" aria-controls="profile" aria-selected="false">Fast Velocity</a>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Trial #</th>
                    <th scope="col">Time taken (in seconds)</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>50.01</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>52.02</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>45.12</td>
                    <td>...</td>
                  </tr>
                </tbody>

                <button type="button" className="btn btn-danger" >Reset All Trials</button>
              </table>

             

            </div>
            <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
              <table class="table table-striped">
                <thead>
                  <tr>
                    <th scope="col">Trial #</th>
                    <th scope="col">Time taken (in seconds)</th>
                    <th scope="col">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>20.01</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>20.02</td>
                    <td>...</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td>25.12</td>
                    <td>...</td>
                  </tr>
                </tbody>

                <button type="button" className="btn btn-danger" >Reset All Trials</button>
              </table>
            </div>

             <div className="row">
                
                  <div className="col-sm">
                    <label>Self-Selected Average Time: 50.0</label>
                  </div>
                  <div>
                    <label>Fast Average Time: 25.0</label>
                  </div>
                  <div className="col-sm">
                    <button type="button" className="btn btn-light" >Generate Average Time (Both)</button>
                   
                  </div>
                
              </div>

          <div className="row">
                  <div className="col-sm">
                    <label>Self-Selected Actual Velocity 8.33 m/s</label>
                  </div>
                  <div>
                    <label>Fast Actual Velocity 5.33 m/s</label>
                  </div>

                  <div className="col-sm">
                    <button type="button" className="btn btn-light" >Generate Actual Velocity Time (Both)</button>
                    
                  </div>

          </div>

          </div>
      </div>
      );
  }
}


export default App;
