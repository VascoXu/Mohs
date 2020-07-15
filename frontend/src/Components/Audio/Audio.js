import React, { Component } from "react";
import "../../App.css";
import "./Audio.css";

class Audio extends Component {

  constructor(props) {
    super(props);
    this.state = {
      recording: false
    };
    this.mediaRecorder = {};
    this.chunks = [];
  }

  record = () => {
    // Ensure getUserMedia is supported
    if (!this.state.recording) {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        console.log('getUserMedia supported.');
        navigator.mediaDevices.getUserMedia (
          {
            audio: true
          })

          // Success callback, start recording
          .then((stream) => this.startRecording(stream))
    
          // Error callback
          .catch(function(err) {
            console.log('The following getUserMedia error occured: ' + err);
          }
        );
      } else {
        console.log('getUserMedia not supported on your browser!');
      }
    }
    else {
      this.stopRecording();
    }

    this.setState({
      recording: !this.state.recording
    });
  }

  startRecording = (stream) => {
    // Start recording
    this.mediaRecorder = new MediaRecorder(stream);
    this.mediaRecorder.start(10);

    // Start visualizing audio
    this.visualize(stream);

    console.log(this.mediaRecorder.state);
    console.log("recorder started");

    var curr_state = this;
    this.mediaRecorder.ondataavailable = function(e) {
      curr_state.chunks.push(e.data);
    }
  }

  stop = () => {
    // Stop recording
    this.mediaRecorder.stop();
    console.log(this.mediaRecorder.state);
    console.log("recorder stopped");
    this.mediaRecorder.onstop = (e) => this.stopRecording(e);
  }

  stopRecording = (e) => {
    console.log("recorder onstopped");

    // Stop and save the recording
    const soundClips = document.querySelector('.sound-clips');    
    const blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
    
    // Send audio blob to server
    fetch('/sound', {
      method: 'POST',
      body: blob
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
    });
    
    this.chunks = [];

    /*
    const clipName = prompt('Enter a name for your sound clip');
  
    const clipContainer = document.createElement('article');
    const clipLabel = document.createElement('p');
    const audio = document.createElement('audio');
    const deleteButton = document.createElement('button');
             
    clipContainer.classList.add('clip');
    audio.setAttribute('controls', '');
    deleteButton.innerHTML = "Delete";
    clipLabel.innerHTML = clipName;
  
    clipContainer.appendChild(audio);
    clipContainer.appendChild(clipLabel);
    clipContainer.appendChild(deleteButton);
    soundClips.appendChild(clipContainer);

    audio.controls = true;
    const blob = new Blob(this.chunks, { 'type' : 'audio/ogg; codecs=opus' });
    
    this.chunks = [];
    const audioURL = window.URL.createObjectURL(blob);
    audio.src = audioURL;
  
    deleteButton.onclick = function(e) {
      let evtTgt = e.target;
      evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
    }
    */
  }

  visualize = (stream) => {
    // Visualize audio stream
    const canvas = document.querySelector('.visualizer');
    const canvasCtx = canvas.getContext("2d");
    let audioCtx;

    if(!audioCtx) {
      audioCtx = new AudioContext();
    }
  
    const source = audioCtx.createMediaStreamSource(stream);
  
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048;
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
  
    source.connect(analyser);
    //analyser.connect(audioCtx.destination);
  
    draw()
  
    function draw() {
      const WIDTH = canvas.width
      const HEIGHT = canvas.height;
  
      requestAnimationFrame(draw);
  
      analyser.getByteTimeDomainData(dataArray);
  
      canvasCtx.fillStyle = 'rgb(200, 200, 200)';
      canvasCtx.fillRect(0, 0, WIDTH, HEIGHT);
  
      canvasCtx.lineWidth = 2;
      canvasCtx.strokeStyle = 'rgb(0, 0, 0)';
  
      canvasCtx.beginPath();
  
      let sliceWidth = WIDTH * 1.0 / bufferLength;
      let x = 0;
  
  
      for(let i = 0; i < bufferLength; i++) {
  
        let v = dataArray[i] / 128.0;
        let y = v * HEIGHT/2;
  
        if(i === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
  
        x += sliceWidth;
      }
  
      canvasCtx.lineTo(canvas.width, canvas.height/2);
      canvasCtx.stroke();
  
    }
  }

  render() {
    return (
      <div className="fixed-bottom ml-3 mb-3">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xs-6">
              <button onClick={this.record} className="btn btn-light">
                <svg className="bi bi-mic-fill" width="2em" height="2em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path fill={this.state.recording ? "green" : "currentColor"} d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z"/>
                  <path fillRule="evenodd" d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z"/>
                </svg>
              </button>
            </div>
            <div className="col-xs-6 ml-3">
              <canvas className="visualizer"></canvas>
            </div>
          </div>
        </div>
      </div>
    );
  }

}

export default Audio;