import React, { Component } from 'react';
import './App.css';

class App extends Component {

  render() {
    return (
      <div className="App container-fluid">
        <h1 className="display-1">10-Meter Timed Tool</h1>
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
    }
    else {
      this.stop();
      
    }
  }

  start(startTime) {
    console.log("Started");
    let {elapsed, isTiming, timerStartTime} = this.state;

    this.timer = 
      setInterval(() => {
        // Calculate elapsed to tenth of a second:
        elapsed = Math.round((new Date() - startTime) / 100);
        // Convert from seconds to One decimal place
        elapsed = (elapsed / 10).toFixed(1);  

        this.setState({
          elapsed: elapsed,
          isTiming: true
        });
      }, 50);
  }

  stop() {
    console.log("Stopped");
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
    return <div>{this.state.elapsed} seconds</div>;
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

class DateMsg extends Component {
  render() {
    let date = new Date();
    let todayDate = date.getMonth() + "/" + date.getDate();

    return (
      <div className="row">
          <div id="date"><span >Date</span>: {todayDate}</div>
        </div>
      );
  }
}

class TabNav extends Component {
  render() {
    return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item">
            <a className="nav-link active" id="ss-tab" data-toggle="tab" href="#ss" role="tab" aria-controls="ss" aria-selected="true">Self-Selected Velocity</a>
          </li>
          <li className="nav-item">
            <a className="nav-link" id="fast-tab" data-toggle="tab" href="#fast" role="tab" aria-controls="fast" aria-selected="false">Fast Velocity</a>
          </li>
        </ul>
      );
  }
}

class TabContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      trials: [{
        id: 1,
        value: 50.0,
        notes: "hi"
      }]
    };
  }

  render() {
    let {trials} = this.state;


    const items = trials.map((item, key) =>
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.value}</td>
          <td>{item.notes}</td>
        </tr>
      );

    return (
      

      <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="ss" role="tabpanel" aria-labelledby="ss-tab">
          <table className="table table-sm table-hover table-borderless">
            <thead className="thread-dark">
              <tr>
                <th scope="col">Trial #</th>
                <th scope="col">Time taken (in seconds)</th>
                <th scope="col">Notes</th>
              </tr>
            </thead>
            <tbody>
              {items}
            </tbody>

            
          </table>
          <button type="button" className="btn btn-danger" >Reset All Trials</button>
        </div>

        <div className="tab-pane fade" id="fast" role="tabpanel" aria-labelledby="fast-tab">
          <table className="table table-sm table-hover table-borderless">
            <thead className="thread-dark">
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

            
          </table>
          <button type="button" className="btn btn-danger" >Reset All Trials</button>
        </div>
      </div>
      );
  }
}

class AverageTimeStat extends Component {
  render() {
    return (
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
      );
  }
}

class AverageVelocityStat extends Component {
   render() {
    return (
      <div className="row">
        <div className="col-sm">
          <label>Self-Selected Actual Velocity 8.33 m/s</label>
        </div>
        <div>
          <label>Fast Actual Velocity 5.33 m/s</label>
        </div>
        <div className="col-sm">
          <button type="button" className="btn btn-light" >Generate Actual Velocity (Both)</button>  
        </div>
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
    

    return(
      <div id="trial-table" className="container-fluid table-bg">
        <DateMsg />
        <TabNav />
        <TabContent />
        <AverageTimeStat />
        <AverageVelocityStat />
      </div>
      );
  }
}


export default App;
