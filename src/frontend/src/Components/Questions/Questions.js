import React, { Component } from "react";
import "../../App.css";
import "./Questions.css";

import { getCurrentTime, playSound, logData } from "../helpers";


class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      step: 0,
      edit: false
    };
  }

  handleChange = (index, event) => {
    // Update questions
    let items = [...this.state.questions];
    items[index] = event.target.value;

    this.setState({
      questions: items
    });
  }

  handleClick = (index, event) => {
    var question = this.props.procedure[this.props.step].questions[index][0];
    var answer = this.props.procedure[this.props.step].questions[index][1];

    // Play sound of answer
    playSound(answer);

    // Insert data to database (i.e. log data)
    var timeElapsed = getCurrentTime();
    var data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: `Question ${index}: ${question}`};
    logData(data);
  }

  export = () => {
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

  setEditMode = () => {
    this.setState({
      edit: true
    })
  }

  render() {

    // Wait for procedure to load
    var procedure = [];
    if (this.props.procedure.length > 0) {
      procedure = this.props.procedure[this.props.step].questions.slice(0, 4);
    }

    return (
      <div className="container full-height mt-2">
        <h2 className="text-center">Questions</h2>
        <hr/>

        {/* Questions */}
        <div className="list-group">
          {procedure.map((step, i) =>
            <button key={i} onClick={this.handleClick.bind(this, i)} type="button" className="btn btn-light btn-block question">Q{i + 1}: {step[0]}</button>
          )}
        </div>
        
        {/* Reminder Button */}
        <div className="container text-center mt-5">
              <button type="button" onClick={this.recordTime} className="btn shadow ml-3 btn-dark btn-lg light-border">
                <svg width="1em" height="1em" viewBox="0 0 16 16" className="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg>
                <span className="ml-2">Reminder</span>
              </button>
        </div>
        
        {/* Zip Folder */}
        <div className="export mr-3 mb-3">
          <button onClick={this.export} className="btn btn-dark"><i className="fa fa-download" aria-hidden="true"></i><span className="ml-2">Finished</span></button>
        </div>
      </div>
    );
  }
}

export default Questions;