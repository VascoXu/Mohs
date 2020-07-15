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
      procedure: [],
      step: 0,
      edit: false
    };
  }

  componentDidMount() {
    // Fetch procedure after mount
    // this.getProcedure();
    var procedure = [
      "Wash hands w/ soap", 
      "Put day x supplies on clean surface outside bathroom",
      "Fresh clean towel & trash bag in bathroom",
      "Shower, remove, gently wash",
      "Dry body and wound then go to set up",
      "Pat dry w/wound gauze or qtip",
      "Cut non-stick dressing then open vaseline",
      "Using 2 qtips thickly “ice” wound with vaseline",
      "Cover with gauze and tape on",
      "See you tomorrow"
    ];
    this.setState({
      procedure: procedure
    });
  }

  inputChange = (index, event) => {
    // Update procedure
    let items = [...this.state.procedure];
    items[index] = event.target.value;

    this.setState({
      procedure: items
    });
  }

  procedureClick = (index, event) => {
    this.setState({
      step: index
    });
    // playSound(this.state.procedure[index]);
  }

  setEditMode = () => {
    this.setState({
      edit: true
    })
  }

  getProcedure = () => {
    // Get a list of procedures
    fetch('/api/procedure')
    .then(response => response.json())
    .then(data => {
      this.procedure = data;
    })
  }

  done = () => {
    // Play sound of question
    //playSound(this.state.procedure[this.state.step]);

    // Stop recording
    var filename = `${localStorage.getItem("currentPnum")}-${this.state.step}`;
    if (this.state.step !== 0) {
      stopAudioRecording(filename);
    }
    startAudioRecording();

    // Update step
    this.setState({
      step: (this.state.step + 1),
    });

    // Insert data to database (i.e log data)
    var timeElapsed = getCurrentTime();
    var data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: `Procedure (Step ${this.state.step}): ${this.state.procedure[this.state.step]}`};
    logData(data);
  }

  back = () => {
    this.setState({
      step: (this.state.step - 1)
    });
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
                  <h5 className="card-title">Step {this.state.step}:</h5>
                  <hr/>
                  <p id="step" className="card-text"> {this.state.procedure[this.state.step]} </p>
                </div>
              </div>
              <div className="text-center mt-4">
                <button type="button" onClick={this.repeat} className="shadow btn btn-secondary btn-lg dark-border">Repeat</button>
                <button type="button" onClick={this.done} className="shadow btn ml-4 btn-secondary btn-lg dark-border">Done</button>
                <section className="sound-clips">
                </section>
              </div>
            </div>
            <div className="col-md-6">
              <ul className="list-group list-group-hover mt-2 mb-5 procedure-list">
                {this.state.procedure.map((step, i) => 
                  {return (this.state.edit
                    ? <input key={i} onChange={this.inputChange.bind(this, i)} type="text" className="form-control procedure" value={step} autoFocus={!i} />
                    : <li key={i} onClick={this.procedureClick.bind(this, i)} id={'l' + i} className={`list-group-item ${(this.state.step === i) ? 'active' : ''}`}>{step}</li>
                  )}
                )}
              </ul>            
            </div>
          </div>
        </div>
        <Audio></Audio>
      </div>
    );
  }
}

export default Procedure;