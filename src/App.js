import React, { Component } from 'react';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeTab: "self-selected",
      selfSelectedTrials: [{
        id: null,
        value: null,
        notes: null,
        type: null
      }],
      fastTrials: [{
        id: null,
        value: null,
        notes: null,
        type: null
      }]
    };
  }

  setActiveTab(tabName) {
    this.setState({
      activeTab: tabName,
      selfSelectedTrials: this.state.selfSelectedTrials,
      fastTrials: this.state.fastTrials
    });
  }

  pushTrial(trial) {
    trial.type = this.state.activeTab;

    // Push to the active state's array
    if (this.state.activeTab == 'self-selected') {
      let trials = this.state.selfSelectedTrials.slice();
      trial.id = this.state.selfSelectedTrials.length;
      trials.push(trial);

      // set state
      this.setState({
        activeTab: this.state.activeTab,
        selfSelectedTrials: trials,
        fastTrials: this.state.fastTrials
      });
    }
    else {
      let trials = this.state.fastTrials.slice();
      trial.id = this.state.fastTrials.length;
      trials.push(trial);

      // set state
      this.setState({
        activeTab: this.state.activeTab,
        selfSelectedTrials: this.state.selfSelectedTrials,
        fastTrials: trials
      });
    }
  }

  resetActiveTabTrials() {
    // Look at the current active tab and empty/reset the array
    if (this.state.activeTab == 'self-selected') {
      let trials = this.state.selfSelectedTrials.slice();
      // start at 1 (trial starts 1)
      trials.length = 1;

      // Set state
      this.setState({
        activeTab: this.state.activeTab,
        selfSelectedTrials: trials,
        fastTrials: this.state.fastTrials
      });
    }
    else {
      let trials = this.state.fastTrials.slice();
      // start at 1 (trial starts 1)
      trials.length = 1;

      // Set state
      this.setState({
        activeTab: this.state.activeTab,
        selfSelectedTrials: this.state.selfSelectedTrials,
        fastTrials: trials
      });
    }
  }

  render() {
    return (
      <div className="App container-fluid">
        <h1 className="display-1">10-Meter Timed Tool</h1>
        <Timer pushTrialEvent={this.pushTrial.bind(this)} />
        <TrialTable 
            selfSelectedTrialsData={this.state.selfSelectedTrials} 
            fastTrialsData={this.state.fastTrials} 
            setActiveTabEvent={this.setActiveTab.bind(this)} 
            resetActiveTabTrialsEvent={this.resetActiveTabTrials.bind(this)} />
      </div>
    );
  }
}


class TrialTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selfSelectedAvgTime: 0,
      fastAvgTime: 0,
      selfSelectedVelocity: 0,
      fastVelocity: 0
    };
  }

  calculateAverageTime(data) {
    let i, sum=0, avg=0;
    let length = data.length-1; // get rid of empty index 0 

    if (length === 0) {
      return 0;
    }
    for (i = 1; i <= length; i++) {
      sum+=parseFloat(data[i].value);
    }
    avg = sum/length;
    return avg;
  }

  calculateActualVelocity(data) {
     let avg = this.calculateAverageTime(data), velocity=0;
     velocity = avg/6;
     return velocity;
  }

  calculateAverageTimeForBothDataset() {
    let selfSelectedAvgTime = this.calculateAverageTime(this.props.selfSelectedTrialsData);
    let fastAvgTime = this.calculateAverageTime(this.props.fastTrialsData);

    this.setState({
      selfSelectedAvgTime: selfSelectedAvgTime,
      fastAvgTime: fastAvgTime
    });
  }

  calculateActualVelocityForBothDataset() {
    let selfSelectedVelocity = this.calculateActualVelocity(this.props.selfSelectedTrialsData).toFixed(2);
    let fastVelocity = this.calculateActualVelocity(this.props.fastTrialsData).toFixed(2);

    this.setState({
      selfSelectedVelocity: selfSelectedVelocity,
      fastVelocity: fastVelocity
    });
  }

  render() {
    return(
      <div id="trial-table" className="container-fluid table-bg">
        <DateMsg />
        <TabNav setActiveTabEvent={this.props.setActiveTabEvent} />
        <TabContent 
            selfSelectedTrialsData={this.props.selfSelectedTrialsData} 
            fastTrialsData={this.props.fastTrialsData} 
            resetActiveTabTrialsEvent={this.props.resetActiveTabTrialsEvent} />
        <AverageTimeStat 
            selfSelectedAvgTime={this.state.selfSelectedAvgTime} 
            fastAvgTime={this.state.fastAvgTime} 
            buttonEvent={this.calculateAverageTimeForBothDataset.bind(this)} />
        <ActualVelocityStat 
            selfSelectedVelocity={this.state.selfSelectedVelocity} 
            fastVelocity={this.state.fastVelocity} 
            buttonEvent={this.calculateActualVelocityForBothDataset.bind(this)} />
      </div>
      );
  }
}

class Timer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsed: 0,
      isTiming: false
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
    let date = new Date();
    let todayDate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();
    let {elapsed, isTiming} = this.state;

    this.setState({
      isTiming: false
    });
    clearInterval(this.timer);

    this.props.pushTrialEvent({
        value: elapsed,
        notes: todayDate,
      });
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
        onClick={() => this.stop()}>Stop & Record</button> : null;

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
    let todayDate = date.getMonth() + "/" + date.getDate() + "/" + date.getFullYear();

    return (
      <div className="row">
          <div id="date"><span >Date</span>: {todayDate}</div>
        </div>
      );
  }
}

class TabNav extends Component {

  setActiveTab(tabName) {
    console.log("set active: " + tabName);
    this.props.setActiveTabEvent(tabName);
  };

  render() {
    return (
        <ul className="nav nav-tabs" id="myTab" role="tablist">
          <li className="nav-item" onClick={() => this.setActiveTab("self-selected")} >
            <a className="nav-link active" id="ss-tab" data-toggle="tab" href="#ss" role="tab" aria-controls="ss" aria-selected="true">Self-Selected Velocity</a>
          </li>
          <li className="nav-item" onClick={() => this.setActiveTab("fast")} >
            <a className="nav-link" id="fast-tab" data-toggle="tab" href="#fast" role="tab" aria-controls="fast" aria-selected="false">Fast Velocity</a>
          </li>
        </ul>
      );
  }
}

class TabContent extends Component {

  render() {

    const selfSelectedItems = this.props.selfSelectedTrialsData.map((item, key) =>
        <tr key={item.id}>
          <th scope="row">{item.id}</th>
          <td>{item.value}</td>
          <td>{item.notes}</td>
        </tr>
      );

    const fastItems = this.props.fastTrialsData.map((item, key) =>
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
              {selfSelectedItems}
            </tbody>   
          </table>
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
              {fastItems}
            </tbody>
          </table>
        </div>
        <button type="button" className="btn btn-danger" onClick={() => this.props.resetActiveTabTrialsEvent()} >Reset Trials</button>
      </div>
      );
  }
}

class AverageTimeStat extends Component {
  render() {
    return (
      <div className="row">  
        <div className="col-sm">
          <label>Self-Selected Average Time: {this.props.selfSelectedAvgTime}</label>
        </div>
        <div>
          <label>Fast Average Time: {this.props.fastAvgTime}</label>
        </div>
        <div className="col-sm">
          <button 
              onClick={() => this.props.buttonEvent()} 
              type="button" 
              className="btn btn-light">Generate Average Time (Both)</button>
        </div>
      </div>
      );
  }
}

class ActualVelocityStat extends Component {
   render() {
    return (
      <div className="row">
        <div className="col-sm">
          <label>Self-Selected Actual Velocity {this.props.selfSelectedVelocity} m/s</label>
        </div>
        <div>
          <label>Fast Actual Velocity {this.props.fastVelocity} m/s</label>
        </div>
        <div className="col-sm">
          <button 
              onClick={() => this.props.buttonEvent()} 
              type="button" 
              className="btn btn-light" >Generate Actual Velocity (Both)</button>  
        </div>
      </div>
      );
  }
}

export default App;
