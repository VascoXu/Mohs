import React, { Component } from "react";
import "../../App.css";
import "./Questions.css";

import { getCurrentTime, playSound, logData } from "../helpers";


class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      edit: false
    };
  }

  componentDidMount() {
    const questions = [
      "Can I use Purell/hand sanitizer?", 
      "How long do I wash my hands for?",
      "How long do I keep the band-aid for?",
      "Unanswerable"
    ];
    this.setState({
      questions: questions
    });
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
    // Play sound of question
    // playSound(this.state.questions[index]);

    // Insert data to database (i.e. log data)
    var timeElapsed = getCurrentTime();
    var data = {pnum: localStorage.getItem("currentPnum"), timestamp: timeElapsed, action: `Question ${index}: ${this.state.questions[index]}`};
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
        var url = window.URL.createObjectURL(blob);
        var a = document.createElement('a');
        a.href = url;
        a.download = `${localStorage.getItem('currentPnum')}.zip`;
        document.body.appendChild(a); // we need to append the element to the dom -> otherwise it will not work in firefox
        a.click();    
        a.remove();  //afterwards we remove the element again         
    });
  }

  setEditMode = () => {
    this.setState({
      edit: true
    })
  }

  render() {
    return (
      <div className="container full-height mt-2">
        <h2 className="text-center">Questions</h2>
        <hr/>
        <div className="list-group">
          {this.state.questions.map((question, i) =>
            {return (this.state.edit
              ? <input key={i} onChange={this.handleChange.bind(this, i)} type="text" className="form-control question mt-2" value={this.state.questions[i]} autoFocus={!i} />
              : <button key={i} onClick={this.handleClick.bind(this, i)} type="button" className="btn btn-light btn-block question">Q{i}: {question}</button>
            )}
            // <button key={i} type="button" className="list-group-item list-group-item-action question mt-2">Q{i}: {question}</button>
          )}
        </div>
        {/* <Question key={i} data_index={i+1} question={question}></Question> */}
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
          <button onClick={this.export} className="btn btn-primary"><i className="fa fa-download" aria-hidden="true"></i><span className="ml-2">Export Data</span></button>
        </div>
      </div>
    );
  }
}

export default Questions;