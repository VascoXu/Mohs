import React, { Component } from 'react';
import SmashLab from './SmashLab.png'
import './Login.css';
import history from '../../history';
import Reminders from '../Reminders/Reminders';
import { getCurrentTime, getTodaysDate } from "../helpers";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pnum: "",
      enum: "",
      etime: "",
      filename: "",
      session_id: "",
      eready: false,
      econsent: false,
      econsented: false,
      pconsent: false,
      reminders: false,
      edit: false
    };
    this.foldername = "";
  }

  componentDidMount() {
    // Get current session_id number
    fetch('/api/session_id')
    .then(response => response.json())
    .then(data => {
      this.setState({
        session_id: data["session_id"]
      });
    })
  }

  handleChange = (event) => {
    const userEnum = event.target.value;
    this.setState({
      [event.target.name]: userEnum
    });
    
    // Lookup Experimenter in LocalStorage
    if (event.target.name === "enum") {
      var enums = JSON.parse(localStorage.getItem("enums") || "[]");
      if (enums.includes(event.target.value)) {
        this.setState({
          econsent: true
        })
      }
      else if (!this.state.econsented) {
        this.setState({
          econsent: false
        })
      }
    }
  }

  // Handle Experimenter checkbox
  handleExperimenterConsent = () => {
    this.setState({
      econsent: !this.state.econsent,
      econsented: true
    });
  }

  // Handle Participant checkbox
  handleParticipantConsent = () => {
    this.setState({
      pconsent: !this.state.pconsent,
    });
  }

  experimenterReady = () => {
    // Insert enum into LocalStorage
    var enums = JSON.parse(localStorage.getItem("enums") || "[]");
    if (!enums.includes(this.state.enum)) {
      enums.push(this.state.enum);
      localStorage.setItem("enums", JSON.stringify(enums));
    }
      
    this.setState ({
      eready: true,
      etime: getCurrentTime()
    });
  }

  toggleReminders = () => {
    // Reminders popup 
    this.setState({
      reminders: !this.state.reminders
    });
  }

  remindersDone = () => {
    history.push('/Home', {pnum: this.state.pnum, foldername: this.foldername});
  }

  participantReady = () => {
    // Store current Participant Number in LocalStorage
    localStorage.setItem("currentPnum", this.state.pnum);

    // Store current Experimenter Number in LocalStorage
    localStorage.setItem("currentEnum", this.state.enum);

    // Deteremine filename
    var time = getCurrentTime().replace(/:/g, '');
    this.foldername = `${time}_${this.state.enum}_${this.state.pnum}_${this.state.session_id}`;

    // Inform the server about the Participant Number
    fetch('/api/pnum', {
      method: 'POST',
      body: JSON.stringify({
        foldername: this.foldername,
        pnum: this.state.pnum,
        etime: this.state.etime,
        ptime: getCurrentTime()
      }),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
    })
    .then(response => response.json())
    .then(result => {
      // Print result
      console.log(result);
    });

    // Update session_id number
    fetch('/api/session_id', {
      method: 'POST',
    })
    .then(response => response.json())
    .then(result => {
      // Print result
      console.log(result);
    });

    // Toggle reminders popup
    this.toggleReminders();
  }

  render() {

    const isValidLogin = !(this.state.pnum.trim() === "" || this.state.enum.trim() === "" || !this.state.econsent || !this.state.pconsent);
    let expButton, partButton;
    if (isValidLogin) {
      expButton = <button id="eready" onClick={this.experimenterReady} className="btn btn-lg btn-primary btn-block">Experimenter Ready</button>;
    }
    else {
      expButton = "";
    }

    if (this.state.eready) {
      partButton = <button id="pready" onClick={this.participantReady} className="btn btn-lg btn-info btn-block" type="submit">Participant Ready</button>;
    }
    else {
      partButton = "";
    }

    return (
      <div className="login text-center">
        <div className="form-signin">
          <img className="mb-4 smash_logo" src={SmashLab} alt="Smash Lab" />
          <h1 className="h3 font-weight-normal">Please sign in</h1>
          {/* Session_ID Number */}
          <div className="mb-4">
            <p className="h5">Session ID: {this.state.session_id}</p>
          </div>

          {/* Experimenter Input Group */}
          <div className="input-group mb-2">
            <input onChange={this.handleChange} type="text" name="enum" id="inputEnum" className="form-control" placeholder="Experimenter number" value={this.state.enum} required autoFocus />
            <div className="input-group-append">
              <div className="input-group-text">
                <input className="mr-1" onChange={this.handleExperimenterConsent} type="checkbox" value="econsent" checked={this.state.econsent} /> consent
              </div>
            </div>
          </div>

          {/* Participant Input Group */}
          <div className="input-group mb-3">
            <input onChange={this.handleChange} type="text" name="pnum" id="inputPnum" className="form-control" placeholder="Participant Number" value={this.state.pnum} required />
            <div className="input-group-append">
              <div className="input-group-text">
                <input className="mr-1" onChange={this.handleParticipantConsent} type="checkbox" value="pconsent" checked={this.state.pconsent} /> consent
              </div>
            </div>
          </div>

          {expButton}
          {partButton}

          {this.state.reminders ? <Reminders toggle={this.toggleReminders} done={this.remindersDone}/> : null}

        </div>
      </div>
     );
  }
}

export default Login;
