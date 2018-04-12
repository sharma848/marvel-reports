import React, { Component } from 'react';
import Login from '../Login/Login';
import Dashboard from '../Dashboard/Dashboard';



class Home extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false
    };
  }
  render() {
    let element;
    if(this.state.isLoggedIn) {
      element = <Dashboard />;
    } else {
      element = <Login />;
    }
    return (
      <div className="main">
        {element}
      </div>
    );
  }
}

export default Home;
