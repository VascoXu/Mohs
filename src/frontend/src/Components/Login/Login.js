import React, { Component } from 'react';
import SmashLab from './SmashLab.png'
import './Login.css';
import history from '../../history';
import { getCurrentTime, getTodaysDate } from "../helpers";

class Login extends Component {

  constructor(props) {
    super(props);
    this.state = {
      pnum: "",
      enum: "",
      etime: "",
      eready: false,
      econsent: false,
      econsented: false,
      pconsent: false,
      edit: false
    };
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

  participantReady = () => {
    history.push('/Home', {pnum: this.state.pnum});

    // Store current Participant Number in LocalStorage
    localStorage.setItem("currentPnum", this.state.pnum);

    // Store current Experimenter Number in LocalStorage
    localStorage.setItem("currentEnum", this.state.enum);

    // Deteremine filename
    var date = getTodaysDate();
    var time = getCurrentTime().replace(/:/g, '');;
    var filename = `${date}_${time}_${this.state.enum}_${this.state.pnum}`;

    // Inform the server about the Participant Number
    fetch('/api/pnum', {
      method: 'POST',
      body: JSON.stringify({
        filename: filename,
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
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>

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
        </div>
      </div>
     );
  }
}

export default Login;
