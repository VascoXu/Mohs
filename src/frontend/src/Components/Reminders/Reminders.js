import React, { Component } from "react";
import './Reminders.css';

class Reminders extends Component {

  constructor(props) {
    super(props);
    this.state = {
      reminders: [],
      clicked: []
    };
  }

  getReminders = () => {
    // Get a list of reminders
    fetch('/api/reminders')
    .then(response => response.json())
    .then(data => {
      var reminders = data['reminders'];

      // Initialize clicked list
      var clicked = [];
      for (let i = 0; i < reminders.length; i++) {
        clicked[i] = false;
      }
      this.setState({
        reminders: reminders,
        clicked: clicked
      });
    })
  }

  reminderClick = (index, event) => {
    // Update clicked list
    var clickedCopy = [...this.state.clicked];
    clickedCopy[index] = !clickedCopy[index];
    this.setState({
      clicked: clickedCopy
    });
  }

  componentDidMount() {
    // Get procedure
    this.getReminders();
  }

  render() {
    return (
      <div >
        <div className="my-modal d-flex align-items-center">
          <div className="content">
          <div className="card">
            <h5 className="card-header">Mohs Experiment Reminders</h5>
            <div className="card-body">      
              <ul className="todoList">
                {this.state.reminders.map((step, i) =>
                <li key={i} className={`todoItem ${(this.state.clicked[i]) ? 'completed' : ''}`} onClick={this.reminderClick.bind(this, i)}><span>{step}</span></li>
                )}
              </ul>
              <button type="button" className="btn btn-primary float-right done-button" onClick={this.props.done} disabled={!this.state.clicked.every(Boolean)}>Done</button>
              <button type="button" className="btn btn-secondary float-right done-button" onClick={this.props.toggle}>Close</button>
            </div>
          </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Reminders;