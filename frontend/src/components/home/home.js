import React, { Component} from 'react';
//import axios from 'axios';

class Home extends Component {
  constructor(props) {
    super(props);

  }

  render() {
    return (
      <div className="container">
        <h1>Home Page</h1>
            <a href="/profile"><button type="button" className="btn btn-primary">Primary</button></a>
            <a href="/receptionistDashboard"><button type="button" className="btn btn-secondary">Receptionist Dashboard</button></a>
            <a href="/workingEmployee"><button type="button" className="btn btn-success">Manager Dashboard</button></a>
            <a href="/kitchenHeadDashboard"><button type="button" className="btn btn-danger">Kitchen Head Dashboard</button></a>
      </div>
    )
  }
}

export default Home;