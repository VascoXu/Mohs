import React, { Component } from "react";
import "../../App.css";
import "./Audio.css";

class Audio extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="bottom-right mr-3 mb-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6">
              <button className="btn btn-light">
                <svg className="bi bi-mic-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill={this.props.recording ? "green" : "currentColor"} d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                  <path fillRule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </button>
            </div>
            {/* <div className="col-xs-6 ml-3">
              <canvas className="visualizer"></canvas>
            </div> */}
          </div>
        </div>
      </div>
    );
  }

}

export default Audio;