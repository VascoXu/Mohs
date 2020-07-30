import React, { Component } from "react";
import Audio from "../Audio/Audio"
import "../../App.css";
import "./Questions.css";

import { getCurrentTime, getTimeElapsed, playSound, logData, log } from "../helpers";


class Questions extends Component {

  constructor(props) {
    super(props);
    this.state = {
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
    var action = `P${this.props.step + 1}Q${index + 1}: ${question}`;
    log(action, this.props.startTime);
  }

  reminder = () => {
    // Remind user to vocalize their actions
    playSound("Please remember to describe what you are doing as you perform each step.");

    // Log reminder clicked
    var action = "Reminder clicked.";
    log(action, this.props.startTime);
  }

  setEditMode = () => {
    this.setState({
      edit: true
    })
  }

  render() {

    // Wait for procedure to load
    var procedure = [];
    if (this.props.procedure.length > 0 && this.props.step >= 0) {
      procedure = this.props.procedure[this.props.step].questions.slice(0, 4);
    }

    return (
      <div className="container full-height mt-2">
        <h2 className="text-center">Questions</h2>
        <hr/>

        {/* Questions */}
        <div className="list-group">
          {procedure.map((step, i) =>
            <button key={i} onClick={this.handleClick.bind(this, i)} type="button" className={`btn btn-light btn-block question ${(this.props.step < 0) ? 'none' : ''}`}>Q{i + 1}: {step[0]}</button>
          )}
        </div>
        
        {/* Reminder Button */}
        <div className="container text-center mt-5">
          <button type="button" onClick={this.reminder} className="btn shadow ml-3 btn-dark btn-lg light-border">
            <i className="fa fa-bell" aria-hidden="true"></i>
            <span className="ml-2">Reminder</span>
          </button>
        </div>

        {/* Audio Icon */}
        <Audio recording={(this.props.step >= 0 && this.props.step < this.props.procedure.length - 1)}></Audio>
        
        {/* <div className="bottom-right">
          <span><b>Experimenter #: </b>{localStorage.getItem("currentEnum")}</span>
          <br/>
          <span><b>Participant #: </b>{localStorage.getItem("currentPnum")}</span>
        </div> */}
      </div>
    );
  }
}

export default Questions;