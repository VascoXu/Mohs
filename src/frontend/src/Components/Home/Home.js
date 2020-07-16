import React, { Component } from "react";
import Questions from '../Questions/Questions'
import Procedure from '../Procedure/Procedure'
import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      procedure: [], 
      step: 0
    }
  }

  getProcedure = () => {
    // Get a list of procedures
    fetch('/api/procedure')
    .then(response => response.json())
    .then(data => {
      console.log(data)
      this.setState({
        procedure: data
      });
    })
  }

  updateStep = (step) => {
    this.setState({
      step: step
    })
  }

  incrementStep = () => {
    this.setState({
      step: (this.state.step + 1) % this.state.procedure.length
    });
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
                        procedure={this.state.procedure} 
                        pnum={this.props.pnum}>
            </Procedure>
          </div>
        </div>

        {/* Right pane (Questions sections) */}
        <div className="bg-light split right">
          <div>
            <Questions incrementStep={this.incrementStep} 
                        updateStep={this.updateStep} 
                        step={this.state.step} 
                        procedure={this.state.procedure} 
                        pnum={this.props.pnum}>
            </Questions>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;