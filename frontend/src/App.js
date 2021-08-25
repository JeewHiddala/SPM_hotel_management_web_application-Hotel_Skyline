import './App.css';

import React from 'react';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';    //make routes

import Footer from './footer/footer';
import Home from './components/Home';
import NavBar from './mainNav/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter, Link, Route } from 'react-router-dom';
import { signout } from './actions/userActions';

// import CheckAvailableRooms from './components/receptionistDashboard/checkAvailableRooms';
import createBooking from './components/receptionistDashboard/createBooking';
import roomBookingManagement from './components/receptionistDashboard/roomBookingManagemnet';
import viewBookedRoom from './components/receptionistDashboard/viewBookedRoomDetails';
import foodOrderManagement from './components/receptionistDashboard/foodOrderManagement';
import createFoodOrder from './components/receptionistDashboard/createFoodOrder';

import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import RegisterScreen from './screens/RegisterScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

import AdminRoute from './component/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
import ProfileScreen from './screens/ProfileScreen';
import PrivateRoute from './component/PrivateRoute';
import ProductListScreen from './screens/ProductListScreen';
import transferToKitchen from './components/receptionistDashboard/transferToKitchen';
import CheckAvailableRooms from './components/receptionistDashboard/checkAvailableRooms';
import PaymentForm from './components/receptionistDashboard/cashpaymentForm';
import PaymentHandling from './components/receptionistDashboard/paymentHandling';
import Paymentm from './components/receptionistDashboard/paymentm';
import CreditPaymentForm from './components/receptionistDashboard/creditpaymentForm';



function App() {


  return (



    <BrowserRouter>
      <NavBar />
      <main>
        <Route path="/home" component={Home} ></Route>
        <Route path="/signin" component={SigninScreen}></Route>
        <Route path="/register" component={RegisterScreen}></Route>
        <Route path="/checkAvailableRooms" component={CheckAvailableRooms} />
        <Route path="/createBooking" component={createBooking} />
        <Route path="/roomBookingManagement" component={roomBookingManagement} />
        <Route path="/viewbooking/:id" component={viewBookedRoom} />
        <Route path="/cashpaymentform/:id" component={PaymentForm} />
        <Route path="/creditpaymentform/:id" component={CreditPaymentForm} />
        <Route path="/paymenthandling" component={PaymentHandling} />
        <Route path="/foodorder" component={foodOrderManagement} />
        <Route path="/transferkitchen" component={transferToKitchen} />
        <Route path="/createfoodorder" component={createFoodOrder} />
        <Route path="/cart/:id?" component={CartScreen}></Route>
        <Route path="/product/:id" component={ProductScreen}></Route>
        <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
        <Route path="/" component={HomeScreen} exact></Route>
        <Route path="/shipping" component={ShippingAddressScreen}></Route>
        <Route path="/payment" component={PaymentMethodScreen}></Route>
        <Route path="/placeorder" component={PlaceOrderScreen}></Route>
        <Route path="/order/:id" component={OrderScreen}></Route>
        <Route path="/paymentm" component={Paymentm}></Route>

        <PrivateRoute
          path="/profile"
          component={ProfileScreen}
        ></PrivateRoute>
        <AdminRoute
          path="/productlist"
          component={ProductListScreen}
        ></AdminRoute>
      </main>

      <Footer />
    </BrowserRouter>
  );
}

export default App;

