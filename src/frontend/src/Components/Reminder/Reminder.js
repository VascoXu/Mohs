import React, { Component } from "react";
import "../../App.css";
import "./Reminder.css";

import { playSound, log } from "../helpers";

class Reminder extends Component {

  constructor(props) {
    super(props);
  }

  reminder = () => {
    // Remind user to vocalize their actions
    playSound("Please remember to describe what you are doing as you perform each step.");

    // Log reminder clicked
    var action = "Reminder clicked.";
    log(action, this.props.startTime, this.props.foldername);
  }

  render() {
    return (
      <div className="bottom-right mr-3 mb-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6">
              <button onClick={this.reminder} className="btn btn-dark">
                <svg width="2em" height="2em" viewBox="0 0 16 16" className="bi bi-bell-fill" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill="light-gray" d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2zm.995-14.901a1 1 0 1 0-1.99 0A5.002 5.002 0 0 0 3 6c0 1.098-.5 6-2 7h14c-1.5-1-2-5.902-2-7 0-2.42-1.72-4.44-4.005-4.901z"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reminder;