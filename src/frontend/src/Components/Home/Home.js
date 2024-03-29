import React, { Component } from "react";
import Questions from '../Questions/Questions'
import Procedure from '../Procedure_V2/Procedure'
import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      procedure: [],
      startTime: 0,
      step: -1
    }
    this.colors = ["F47C7C", "F7F48B", "A1DE93", "F2AFA3", "70A1D7", "B399D4", 
                  "E1B894", "58949C", "FEC8D8", "B3A580", "E18AAA", "8DA290", "DAF0EE"];
  }

  getProcedure = () => {
    // Get a list of procedures
    fetch('/api/procedure')
    .then(response => response.json())
    .then(data => {
      this.setState({
        procedure: data['procedure']
      });
    })
  }

  updateStartTime = (startTime) => {
    this.setState({
      startTime: startTime
    });
  }

  updateStep = (step) => {
    this.setState({
      step: step
    });
  }

  incrementStep = () => {
    this.setState({
      step: (this.state.step + 1) % this.state.procedure.length
    });
  }

  qRefs = [];
  updateQRefs = (ref) => {
    this.qRefs.push(ref);
  }

  componentDidMount() {
    // Get procedure
    this.getProcedure();
  }

  render() {    
    return (
      <div>
        {/* Left pane (Procedure section) */}
        <div className="bg-dark split left">
          <div>
            <Procedure incrementStep={this.incrementStep} 
                        updateStep={this.updateStep}
                        step={this.state.step} 
                        updateStartTime={this.updateStartTime}
                        startTime={this.state.startTime}
                        updateQRefs={this.updateQRefs}
                        qRefs={this.qRefs}
                        colors={this.colors}
                        procedure={this.state.procedure} 
                        foldername={this.props.location.state.foldername}>
            </Procedure>
          </div>
        </div>

        {/* Right pane (Questions sections) */}
        <div className="bg-light split right">
          <div>
            <Questions incrementStep={this.incrementStep} 
                        updateStep={this.updateStep}
                        step={this.state.step} 
                        updateStartTime={this.updateStartTime}
                        startTime={this.state.startTime}
                        updateQRefs={this.updateQRefs}
                        qRefs={this.qRefs}
                        colors={this.colors}
                        procedure={this.state.procedure}
                        foldername={this.props.location.state.foldername}>
            </Questions>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;