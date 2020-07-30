import React, { Component } from "react";
import Audio from "../Audio/Audio"
import "../../App.css";
import "./Procedure.css";
import { getCurrentTime, getTodaysDate, playSound, logData, log } from "../helpers";
import { startAudioRecording, stopAudioRecording } from "../audio";

class Procedure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      ended: false,
      edit: false,
      index: 0
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
    // Ensure procedure has started
    if (!this.state.started) {
      return;
    }

    // Update step
    this.props.updateStep(index);

    // Play sound
    playSound(this.props.procedure[index].procedure);

    // Insert data to database (i.e log data)
    let action = `P${index + 1}: ${this.props.procedure[index].procedure}`;
    log(action, this.props.startTime);

    // Stop recording
    if (this.state.started) {
      // Determine filename
      var date = getTodaysDate();
      var time = getCurrentTime().replace(/:/g, '');;
      var expnum = localStorage.getItem("currentEnum");
      var pnum = localStorage.getItem("currentPnum");

      var filename = `${date}_${time}_${expnum}_${pnum}-${this.state.index}`;
      stopAudioRecording(filename);
    }

    if (index < this.props.procedure.length - 1) {
      startAudioRecording();
    }

    // Increment index
    this.setState({
      index: this.state.index + 1
    });
  }

  setEditMode = () => {
    this.setState({
      edit: true
    })
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

    // User must restart to use the app again
    this.setState({
      started: false
    });
  }

  startProcedure = () => {
    this.setState({
      started: true
    })

    // Update step
    this.props.updateStep(0);

    // Play procedure step
    playSound(this.props.procedure[0].procedure);

    // Log start to database
    let action = "Procedure started.";
    log(action, "start");

    // Update start time
    let startTime = new Date();
    this.props.updateStartTime(startTime);

    // Insert data to database (i.e log data)
    action = `P${this.props.step + 2}: ${this.props.procedure[this.props.step + 1].procedure}`;
    log(action, "start");

    // Start recording
    startAudioRecording();
  }
  
  render() {
    return (
      <div className="full-height mt-2">
        <h2 className="text-white text-center">Procedure</h2>
        <hr/>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <ul className="list-group list-group-hover mt-2 mb-5 procedure-list">
                <li onClick={this.startProcedure} id='start' className={`list-group-item`}>Click <b>here</b> to begin the procedure recording. </li>
                {this.props.procedure.map((step, i) => 
                  <li key={i} 
                      onClick={this.procedureClick.bind(this, i)} 
                      id={'l' + i} 
                      className={`list-group-item ${(this.props.step === i && this.state.started) ? 'active' : ''} ${(!this.state.started) ? 'list-group-item-secondary disabled' : ''}`}>
                        {step.procedure}
                  </li>
                )}
                <li onClick={this.export} id='start' 
                    className={`list-group-item ${(!this.state.started) ? 'list-group-item-secondary disabled' : ''}`}>
                      Click <b>here</b> to end procedure recording and download data. 
                </li>
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