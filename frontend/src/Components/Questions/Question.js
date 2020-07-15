import React, { Component } from "react";

class Question extends Component {

  render() {
    return (
        <div>
          <div className="card mt-2">
            <div className="card-body">
              Q{this.props.data_index}: {this.props.question}
            </div>
          </div>
        </div>
    );
  }
}


export default Question;