import React, { Component } from "react";
import Login from './Components/Login/Login'
import Home from './Components/Home/Home'
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import "./App.css";

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Router history={history}>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/Home" component={Home} />
        </Switch>
      </Router>
    );
  }
}

export default App;
