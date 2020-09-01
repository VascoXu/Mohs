import React, { Component, useRef } from "react";
import Reminder from "../Reminder/Reminder"
import "../../App.css";
import "./Questions.css";

import { playSound, log } from "../helpers";


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

  handleClick = (index, i, event) => {
    var question = this.props.procedure[i].questions[index][0];
    var answer = this.props.procedure[i].questions[index][1];

    // Insert data to database (i.e. log data)
    var action = `P${i + 1}Q${index + 1}: ${question}`;
    log(action, this.props.startTime, this.props.foldername);

    // Play sound of answer
    playSound(answer);
  }

  handleUnanswerable = () => {
    // Insert data to database (i.e. log data)
    var action = `P${this.props.step + 1}Q: Unanswerable`;
    log(action, this.props.startTime, this.props.foldername);
  }

  reminder = () => {
    console.log("hello")
    // Remind user to vocalize their actions
    playSound("Please remember to describe what you are doing as you perform each step.");

    // Log reminder clicked
    var action = "Reminder clicked.";
    log(action, this.props.startTime, this.props.foldername);
  }

  setEditMode = () => {
    this.setState({
      edit: true
    })
  }

  setRef = (ref) => {
    this.props.updateQRefs(ref);
  }

  renderQuestions = (step, i) => {
    return (
    <div
      key={`${i}`}
      className={`${(this.props.step >= 0 && this.props.procedure[i].questions.length > 0) ? 'question-box' : ''}`} 
      style={{backgroundColor: `#${this.props.colors[i]}`}}>
      {step.map((question, index) => 
        <button key={`${i}${index}`}
                ref={this.setRef} 
                onClick={this.handleClick.bind(this, index, i)} 
                type="button"
                className={`btn btn-light btn-block question ${(this.props.step < 0) ? 'none' : ''}`}>Q{index + 1}: {question[0]}
        </button>
      )}
      <button onClick={this.handleUnanswerable} type="button" className={`btn btn-light btn-block question ${(this.props.step < 0) ? 'none' : ''}`}>Unanswerable</button>
    </div>
    )
  }

  render() {
    // Wait for procedure to load
    var procedure = [];
    var questions = [];

    for (let i = 0; i < this.props.procedure.length; i++) {
      questions.push(this.props.procedure[i].questions);
    }

    if (this.props.procedure.length > 0 && this.props.step >= 0) {
      procedure = this.props.procedure[this.props.step].questions;
    }

    return (
      <div className="container full-height mt-2">
        <h2 className="text-center">Questions</h2>
        <hr/>

        {/* Questions */}
        <div className="list-group">
          {questions.map((step, i) => {
            return this.renderQuestions(step, i); 
            }
          )}
        </div>
        
        {/* Reminder Button */}
        <Reminder startTime={this.props.startTime} foldername={this.props.foldername}></Reminder>
        
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