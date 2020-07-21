import React, { Component } from "react";
import Audio from "../Audio/Audio"
import "../../App.css";
import "./Procedure.css";
import { getCurrentTime, playSound, logData } from "../helpers";
import { startAudioRecording, stopAudioRecording } from "../audio";

class Procedure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      ended: false,
      edit: false,
    };
  }

  inputChange = (index, event) => {
    // Update procedure
    let items = [...this.props.procedure];
    items[index] = event.target.value;

    this.setState({
      procedure: items
    });
  }

  procedureClick = (index, event) => {
    // Update step
    this.props.updateStep(index);

    // Play sound
    playSound(this.props.procedure[index].procedure);

    // Insert data to database (i.e log data)
    var timeElapsed = getCurrentTime();
    var data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: `P${this.props.step + 1}: ${this.props.procedure[this.props.step].procedure}`};
    logData(data);
  }

  setEditMode = () => {
    this.setState({
      edit: true
    })
  }

  repeat = () => {
    // Repeat sound
    playSound(this.props.procedure[this.props.step].procedure);

    // Log reminder clicked
    var timeElapsed = getCurrentTime();
    var data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: "Procedure Repeated!"};
    logData(data);
  }

  export = () => {
    // Export data
    fetch('/api/export', {
      method: 'POST',
      body: JSON.stringify({
        pnum: localStorage.getItem('currentPnum')
      }),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.blob())
    .then(blob => {
      // Download Zip file
      var url = window.URL.createObjectURL(blob);
      var a = document.createElement('a');
      a.href = url;
      a.download = `${localStorage.getItem('currentPnum')}.zip`;
      document.body.appendChild(a); 
      a.click();    
      a.remove();  
    });
  } 

  done = () => {
    var length = this.props.procedure.length;
    if (this.state.started) {
      if (this.props.step + 1 < length) {
        // Play sound of procedure
        playSound(this.props.procedure[(this.props.step + 1) % length].procedure);

        // Insert data to database (i.e log data)
        let timeElapsed = getCurrentTime();
        let data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: `P${this.props.step + 1}: ${this.props.procedure[this.props.step].procedure}`};
        logData(data);

        // Update step
        this.props.incrementStep();
      }
      else {
        // Procedure has ended
        this.setState({
          ended: true
        })

        // Log end to database
        let timeElapsed = getCurrentTime();
        let data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: "Procedure has ended!"};
        logData(data);
      }
    }
    else {
      this.setState({
        started: true
      })
      
      // Log start to database
      let timeElapsed = getCurrentTime();
      let data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: "Procedure has started!"};
      logData(data);

      playSound(this.props.procedure[(this.props.step) % length].procedure);
    }

    // Stop recording
    if (this.state.started) {
      // Determine filename
      var filename = `${localStorage.getItem("currentPnum")}-${this.props.step}`;
      console.log(filename);
      stopAudioRecording(filename);
    }
    if (this.props.step + 1 < length) {
      startAudioRecording();
    }
  }
  
  render() {

    var card_title = undefined;
    var card_body = undefined;
    var card_button = undefined;
    if (this.state.ended) {
      card_title =  <h5 className="card-title">Finish:</h5>;
      card_body = <p id="step" className="card-text"> Push <b>Finished</b> to download data</p>;
      card_button = <button type="button" onClick={this.export} className="shadow btn ml-4 btn-secondary btn-lg dark-border"><i className="fa fa-download" aria-hidden="true"></i><span className="ml-2">Finished</span></button>;
    }
    else if (this.state.started) {
      card_title = <h5 className="card-title">Step {this.props.step}:</h5>;
      card_body = <p id="step" className="card-text"> {this.props.procedure[this.props.step].procedure} </p>;
      card_button = <button type="button" onClick={this.done} className="shadow btn ml-4 btn-secondary btn-lg dark-border">Done</button>;
    }
    else {
      card_title = <h5 className="card-title">Introduction:</h5>;
      card_body = <p id="step" className="card-text"> Push <b>Next</b> to begin the procedure recording </p>;
      card_button = <button type="button" onClick={this.done} className="shadow btn ml-4 btn-secondary btn-lg dark-border"><i className="fa fa-play" aria-hidden="true"></i><span className="ml-2">Next</span></button>;
    }

    return (
      <div className="full-height mt-2">
        <h2 className="text-white text-center">Procedure</h2>
        <hr/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card mt-2">
                <div className="card-body text-center">
                  {card_title}
                  <hr/>
                  {card_body}
                </div>
              </div>
              <div className="text-center mt-4">
                <button type="button" onClick={this.repeat} className="shadow btn btn-secondary btn-lg dark-border">Repeat</button>
                {card_button}
              </div>   
            </div>
            <div className="col-md-6">
              <ul className="list-group list-group-hover mt-2 mb-5 procedure-list">
                {this.props.procedure.map((step, i) => 
                  <li key={i} onClick={this.procedureClick.bind(this, i)} id={'l' + i} className={`list-group-item ${(this.props.step === i && this.state.started) ? 'active' : ''}`}>{step.procedure}</li>
                )}
              </ul>            
            </div>
          </div>
        </div>
        <Audio recording={this.state.started}></Audio>
      </div>
    );
  }
}

export default Procedure;