import React, { Component } from "react";
import Questions from '../Questions/Questions'
import Procedure from '../Procedure/Procedure'
import './Home.css';

class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      db: null
    };
    this.startTime = Math.floor(Date.now() / 1000);
  }

  componentDidMount() {
    // Open IndexedDB database
    var request = window.indexedDB.open("mohs", 3);
  
    request.onsuccess = (event) => {
      this.setState({
        db: event.target.result
      });
    }
  
    request.onerror = function(event) {
      // Generic error handler for all errors targeted at this database's request
      console.error("Database error: " + event.target.errorCode);
    };
  
    request.onupgradeneeded = function(event) {
      let db = event.target.result;
      
      // Create an objectStore to store log file
      db.createObjectStore("log", { autoIncrement : true });

      // Create an objectStore to store Experimenter Numbers
      db.createObjectStore("enums", { autoIncrement : true });
    };
  }

  render() {    
    return (
      <div>
        {/* Left pane (Procedure section) */}
        <div className="bg-dark split left">
          <div>
            <Procedure db={this.state.db} pnum={this.props.pnum}></Procedure>
          </div>
        </div>

        {/* Right pane (Questions sections) */}
        <div className="bg-light split right">
          <div>
            <Questions db={this.state.db} pnum={this.props.pnum}></Questions>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;