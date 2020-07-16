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
  }

  setEditMode = () => {
    this.setState({
      edit: true
    })
  }


  done = () => {
    // Play sound of procedure
    var length = this.props.procedure.length;
    if (this.state.started) {
      playSound(this.props.procedure[(this.props.step + 1) % length].procedure);

      // Determine filename
      var filename = `${localStorage.getItem("currentPnum")}-${this.props.step}`;

      // Insert data to database (i.e log data)
      var timeElapsed = getCurrentTime();
      var data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: `Procedure (Step ${this.props.step}): ${this.props.procedure[this.props.step].procedure}`};
      logData(data);

      // Update step
      this.props.incrementStep();

    }
    else {
      this.setState({
        started: true
      })
      playSound(this.props.procedure[(this.props.step) % length].procedure)
    }

    // Stop recording
    if (this.state.started) {
      stopAudioRecording(filename);
    }
    if (this.props.step < length) {
      startAudioRecording();
    }

  }
  
  render() {
    return (
      <div className="full-height mt-2">
        <h2 className="text-white text-center">Procedure</h2>
        <hr/>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-6">
              <div className="card mt-2">
                <div className="card-body text-center">
                  {this.state.started
                    ? <h5 className="card-title">Step {this.props.step}:</h5>
                    : <h5 className="card-title">Introduction:</h5>
                  }
                  <hr/>
                  {this.props.procedure.length > 0 && this.state.started
                    ? <p id="step" className="card-text"> {this.props.procedure[this.props.step].procedure} </p>
                    : <p id="step" className="card-text"> Press DONE to begin procedure and recording.</p>
                  }
                </div>
              </div>
              <div className="text-center mt-4">
                <button type="button" onClick={this.repeat} className="shadow btn btn-secondary btn-lg dark-border">Repeat</button>
                <button type="button" onClick={this.done} className="shadow btn ml-4 btn-secondary btn-lg dark-border">Done</button>                
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