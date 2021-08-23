import React, { Component } from "react";
import { Switch, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";


import Login from "./components/login/login.component";
import Home from "./components/home/home.component";
import Profile from "./components/profile/profile.component";
import BoardUser from "./components/board-user.component";
import Navbar from './components/navBar/navBar';
import Footer from './components/footer/footer';
import CustomerRegister from './components/customer-registration/customer-register';
import CheckoutHandling from './components/bill-handling/checkoutHandling';
import CreateCheckoutBill from './components/bill-handling/createCheckoutBill';

class App extends Component {

  render() {

    return (
      <Router>
      <div>
        <Navbar />
        <div className="container mt-3">
        
          <Switch>
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register-customer" component={CustomerRegister} />
            <Route exact path="/profile" component={Profile} />
            <Route exact path="/reception/checkout" component={CheckoutHandling} />
            <Route exact path="/reception/createCheckoutBill" component={CreateCheckoutBill} />
            <Route path="/user" component={BoardUser} />
            
            
          </Switch>
          
        </div>
        <Footer />
      </div>
      </Router>
    );
  }
}

export default App;