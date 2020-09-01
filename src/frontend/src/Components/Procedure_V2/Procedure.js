import React, { Component } from "react";
import "../../App.css";
import "./Procedure.css";
import { getCurrentTime, getTodaysDate, playSound, logData, log, playBeep } from "../helpers";
import { startAudioRecording, stopAudioRecording } from "../audio";

class Procedure extends Component {

  constructor(props) {
    super(props);
    this.state = {
      started: false,
      ended: false,
      edit: false,
      isRecording: false,
      index: 0,
    };
    this.qPos = [];
    this.prevClicked = null;
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

    // Change background color
    event.target.style.background = `#${this.props.colors[index]}`;
    if (this.prevClicked) this.prevClicked.style.background = "white";
    this.prevClicked = event.target;

    // Update step
    this.props.updateStep(index);

    // Insert data to database (i.e log data)
    let action = `P${index + 1}: ${this.props.procedure[index].procedure}`;
    log(action, this.props.startTime, this.props.foldername);

    // Play sound
    playSound(this.props.procedure[index].procedure);

    // Stop recording
    if (this.state.started) {
      // Determine filename
      var date = getTodaysDate();
      var time = getCurrentTime().replace(/:/g, '');;
      var expnum = localStorage.getItem("currentEnum");
      var pnum = localStorage.getItem("currentPnum");

      var filename = `${date}_${time}_${expnum}_${pnum}-${this.state.index}`;
      stopAudioRecording(filename, this.props.foldername);

      this.setState({
        isRecording: false
      });
    }

    if (index < this.props.procedure.length) {
      startAudioRecording();
      this.setState({
        isRecording: true
      });

      this.scrollToQuestion(index);
    }
    else {
      // Log end to database
      let action = "Procedure ended.";
      log(action, this.props.startTime, this.props.foldername);
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
    if (this.state.isRecording) {
      // Determine filename
      var date = getTodaysDate();
      var time = getCurrentTime().replace(/:/g, '');;
      var expnum = localStorage.getItem("currentEnum");
      var pnum = localStorage.getItem("currentPnum");

      var filename = `${date}_${time}_${expnum}_${pnum}-${this.state.index}`;
      stopAudioRecording(filename, this.props.foldername);
      
      // Log end to database
      let action = "Procedure ended.";
      log(action, this.props.startTime, this.props.foldername);

      this.setState({
        isRecording: false
      })
    }

    // Wait 1 second before export
    setTimeout( () => {
      // Export data
      fetch('/api/export', {
        method: 'POST',
        body: JSON.stringify({
          foldername: this.props.foldername,
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
        a.download = `${this.props.foldername}.zip`;
        document.body.appendChild(a); 
        a.click();    
        a.remove();  
      });

      // User must restart to use the app again
      this.setState({
        started: false
      });
    }, 1000);
  }

  startProcedure = () => {
    this.setState({
      started: true
    })

    // Start recording
    startAudioRecording();

    // Determine the index of questions
    var index = 0;
    this.qPos.push(1);
    for (let i = 0; i < this.props.procedure.length; i++) {
      index += this.props.procedure[i].questions.length;
      this.qPos.push(index);
    }
  
    // Log start to database
    let action = "Procedure started.";
    log(action, "start", this.props.foldername);

    // Update start time
    let startTime = new Date();
    this.props.updateStartTime(startTime);

    // Update step
    this.props.updateStep(0);
    
    // Change background of first element
    document.getElementById('l0').style.background = `#${this.props.colors[0]}`;
    this.prevClicked = document.getElementById('l0');
    
    // Play initial beep sound
    playBeep();

    // Wait 2 seconds before playing procedure audio 
    setTimeout( () => {
      // Insert data to database (i.e log data)
      action = `P${this.props.step + 1}: ${this.props.procedure[this.props.step].procedure}`;
      log(action, this.props.startTime, this.props.foldername);

      // Play procedure step
      playSound(this.props.procedure[0].procedure);

    }, 2000);
  }

  changeBackground = (i, e) => {
    e.target.style.background = `#${this.props.colors[i]}`;
  }

  resetBackground = (i, e) => {
    if (e.target !== this.prevClicked) {
      e.target.style.background = "white";
    }
  }

  scrollToQuestion = (i) => {
    var index = this.qPos[i];
    if (index < this.props.qRefs.length) {
      this.props.qRefs[index].scrollIntoView({ block: 'start',  behavior: 'smooth' });
    }
  }
  
  render() {
    return (
      <div className="full-height mt-2">
        <h2 className="text-white text-center">Procedure</h2>
        <hr/>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="list-group mt-2 mb-5 procedure-list">
                <button onClick={this.startProcedure} id='start' className={`btn-block procedure`}>Click <b>here</b> to begin the procedure recording. </button>
                {this.props.procedure.map((step, i) => 
                  <button key={i} 
                      onClick={this.procedureClick.bind(this, i)} 
                      id={'l' + i} 
                      disabled={!this.state.started}
                      onMouseOver={this.changeBackground.bind(this, i)}
                      onMouseOut={this.resetBackground.bind(this, i)}
                      style={{borderColor: `#${this.props.colors[i]}`}}
                      className={`btn-block procedure ${(this.props.step === i && this.state.started) ? '' : ''} ${(!this.state.started) ? 'disabled' : ''}`}>
                        {step.procedure}
                  </button>
                )}
                <button onClick={this.export} id='start' 
                    className={`btn-block procedure ${(!this.state.started) ? 'list-group-item-secondary disabled' : ''}`}>
                      Click <b>here</b> to end procedure recording and download data. 
                </button>
              </div>            
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Procedure;