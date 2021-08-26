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
import ViewCheckoutBill from './components/bill-handling/viewBill';
import Paymentm from './components/payment-bill/paymentm';
import PaymentForm from './components/payment-bill/cashpaymentForm';
import CreditPaymentForm from './components/payment-bill/creditpaymentForm';

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
              <Route exact path="/reception/viewBill/:id" component={ViewCheckoutBill} />
              <Route path="/paymentm" component={Paymentm}></Route>
              <Route path="/cashpaymentform/:id" component={PaymentForm} />
              <Route path="/creditpaymentform/:id" component={CreditPaymentForm} />
            </Switch>

          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;