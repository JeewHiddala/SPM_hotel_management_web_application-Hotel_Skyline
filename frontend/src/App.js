import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';    //make routes
import Footer from './components/footer/footer';
import WorkingEmployee from './components/managerComponents/views/employeeManagement/workingEmployee';    //IT19007502 - Hiddalarachchi J.
import CreateEmployee from './components/managerComponents/createForms/employeeManagament/createEmployee';    //IT19007502 - Hiddalarachchi J.
import RetiredEmployee from './components/managerComponents/views/employeeManagement/retiredEmployee';    //IT19007502 - Hiddalarachchi J.
import RoomManagement from './components/managerComponents/views/roomManagement/roomManagement';    //IT19007502 - Hiddalarachchi J.
import CreateRoom from './components/managerComponents/createForms/roomManagement/createRoom';    //IT19007502 - Hiddalarachchi J.
import ServiceManagement from './components/managerComponents/views/serviceManagement/serviceManagement';    //IT19007502 - Hiddalarachchi J.
import CreateService from './components/managerComponents/createForms/serviceManagement/createService';    //IT19007502 - Hiddalarachchi J.
import UpdateRoom from './components/managerComponents/updateForms/roomManagement/editRoom';  //IT19007502 - Hiddalarachchi J.
import UpdateWorkingEmployee from './components/managerComponents/updateForms/employeeManagement/editWorkingEmployee';  //IT19007502 - Hiddalarachchi J.
import UpdateService from './components/managerComponents/updateForms/serviceManagement/editService';  //IT19007502 - Hiddalarachchi J.
import SearchRoom from './components/managerComponents/searchViews/roomManagement/searchRoom';  //IT19007502 - Hiddalarachchi J.
import SearchService from './components/managerComponents/searchViews/serviceManagement/searchService';  //IT19007502 - Hiddalarachchi J.
import SearchEmployee from './components/managerComponents/searchViews/employeeManagement/searchEmployee';  //IT19007502 - Hiddalarachchi J.
// import ManagerDashboard from './components/managerComponents/views/dashboard/managerDashboard';
import Login from "./components/login/login.component";
import Home from "./components/home/home.component";
import Profile from "./components/profile/profile.component";
import NavBar from './components/navBar/navBar';//Sahanya
import CustomerRegister from './components/customer-registration/customer-register';
import CheckoutHandling from './components/bill-handling/checkoutHandling';
import CreateCheckoutBill from './components/bill-handling/createCheckoutBill';
import ViewCheckoutBill from './components/bill-handling/viewBill';
import Paymentm from './components/payment-bill/paymentm';
import PaymentForm from './components/payment-bill/cashpaymentForm';
import CreditPaymentForm from './components/payment-bill/creditpaymentForm';



// import React from 'react';
// import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';    //make routes

// import Footer from './footer/footer';
// import Home from './components/Home';
// import NavBar from './mainNav/Navbar';//Deshani
import { useDispatch, useSelector } from 'react-redux';
// import { BrowserRouter, Link, Route } from 'react-router-dom';
// import { signout } from './actions/userActions';

// import CheckAvailableRooms from './components/receptionistDashboard/checkAvailableRooms';
import createBooking from './components/receptionistDashboard/createBooking';
import roomBookingManagement from './components/receptionistDashboard/roomBookingManagemnet';
import viewBookedRoom from './components/receptionistDashboard/viewBookedRoomDetails';
import foodOrderManagement from './components/receptionistDashboard/foodOrderManagement';
import createFoodOrder from './components/receptionistDashboard/createFoodOrder';

import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';
// import SigninScreen from './screens/SigninScreen';
// import RegisterScreen from './screens/RegisterScreen';
import OrderHistoryScreen from './screens/OrderHistoryScreen';

// import AdminRoute from './component/AdminRoute';
import HomeScreen from './screens/HomeScreen';
import OrderScreen from './screens/OrderScreen';
import PaymentMethodScreen from './screens/PaymentMethodScreen';
import PlaceOrderScreen from './screens/PlaceOrderScreen';
import ShippingAddressScreen from './screens/ShippingAddressScreen';
// import ProfileScreen from './screens/ProfileScreen';
// import PrivateRoute from './component/PrivateRoute';
// import ProductListScreen from './screens/ProductListScreen';
import transferToKitchen from './components/receptionistDashboard/transferToKitchen';
import CheckAvailableRooms from './components/receptionistDashboard/checkAvailableRooms';
// import PaymentForm from './components/receptionistDashboard/cashpaymentForm';
// import PaymentHandling from './components/receptionistDashboard/paymentHandling';
// import Paymentm from './components/receptionistDashboard/paymentm';
// import CreditPaymentForm from './components/receptionistDashboard/creditpaymentForm';
import CustomerHome from './components/Home';


import IngredientOrderManagement from './components/kitchenHeadComponents/views/ingredientOrderManagement/ingredientOrderManagement';
import FoodManagement from './components/kitchenHeadComponents/views/foodManagement/foodManagement';
import IngredientOrder from './components/kitchenHeadComponents/createForms/ingredientOrder/ingredientOrder';
import Ingredient from './components/kitchenHeadComponents/createForms/ingredient/ingredient';
import Food from './components/kitchenHeadComponents/createForms/food/food';
import ServiceListManagement from './components/kitchenHeadComponents/views/dashboard/serviceListManagement';
import IngredientOrder1 from './components/kitchenHeadComponents/createForms/ingredientOrder/ingredientOrder1';
import CustomerService from './components/receptionistComponents/createForms/customerService/customerService';
import ServiceList from './components/receptionistComponents/createForms/serviceList/serviceList';
import ViewFood from './components/kitchenHeadComponents/views/foodManagement/viewFood';
import ServiceList1 from './components/receptionistComponents/createForms/serviceList/serviceList1';
import ViewIngredientOrder from './components/kitchenHeadComponents/views/ingredientOrderManagement/viewIngredientOrder';


function App() {


  return (
    <div>
      <Router>
        <NavBar />
        <section>
          <Switch>

            {/* <ManagerDashboard> */}
            <Route path="/workingEmployee" component={WorkingEmployee} />
            <Route path="/createEmployee" component={CreateEmployee} />
            <Route path="/retiredEmployee" component={RetiredEmployee} />
            <Route path="/roomManagement" component={RoomManagement} />
            <Route path="/createRoom" component={CreateRoom} />
            <Route path="/serviceManagement" component={ServiceManagement} />
            <Route path="/createService" component={CreateService} />
            <Route path="/updateRoom/:id" component={UpdateRoom} />
            <Route path="/updateWorkingEmployee/:id" component={UpdateWorkingEmployee} />
            <Route path="/updateService/:id" component={UpdateService} />
            <Route path="/searchRoom/:id" component={SearchRoom} />
            <Route path="/searchService/:id" component={SearchService} />
            <Route path="/searchEmployee/:id" component={SearchEmployee} />
            {/* </ManagerDashboard>  */}
            <Route exact path={["/", "/home"]} component={Home} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/register-customer" component={CustomerRegister} />
            <Route exact path="/profile" component={Profile} />

            <Route path="/customerhome" component={CustomerHome} ></Route>
            {/* <Route path="/register" component={RegisterScreen}></Route> */}
            <Route path="/checkAvailableRooms" component={CheckAvailableRooms} />
            <Route path="/createBooking" component={createBooking} />
            <Route path="/roomBookingManagement" component={roomBookingManagement} />
            <Route path="/viewbooking/:id" component={viewBookedRoom} />
            <Route path="/cashpaymentform/:id" component={PaymentForm} />
            <Route path="/creditpaymentform/:id" component={CreditPaymentForm} />
            {/* <Route path="/paymenthandling" component={PaymentHandling} /> */}
            <Route path="/foodorder" component={foodOrderManagement} />
            <Route path="/transferkitchen" component={transferToKitchen} />
            <Route path="/createfoodorder" component={createFoodOrder} />
            <Route path="/cart/:id?" component={CartScreen}></Route>
            <Route path="/product/:id" component={ProductScreen}></Route>
            <Route path="/orderhistory" component={OrderHistoryScreen}></Route>
            <Route path="/foods-customer" component={HomeScreen} exact></Route>
            <Route path="/shipping" component={ShippingAddressScreen}></Route>
            <Route path="/payment" component={PaymentMethodScreen}></Route>
            <Route path="/placeorder" component={PlaceOrderScreen}></Route>
            <Route path="/order/:id" component={OrderScreen}></Route>
            <Route path="/paymentm" component={Paymentm}></Route>
            <Route exact path="/reception/checkout" component={CheckoutHandling} />
            <Route exact path="/reception/createCheckoutBill" component={CreateCheckoutBill} />
            <Route exact path="/reception/viewBill/:id" component={ViewCheckoutBill} />


            <Route path="/kitchenHeadDashboard" component={IngredientOrderManagement} />
                        <Route path="/create-foodManagement" component={FoodManagement} />
                        <Route path="/create-ingredientOrder" component={IngredientOrder} />
                        <Route path="/create-ingredient" component={Ingredient} />
                        <Route path="/create-food" component={Food} />
                        <Route path="/create-serviceListBill" component={ServiceListManagement} /> 
                        <Route path="/create-ingredientOrder-continue" component={IngredientOrder1} /> 
                        <Route path="/create-customerService/:id" component={CustomerService} /> 
                        <Route path="/create-serviceList" component={ServiceList} /> 
                        <Route path="/food-view/:id" component={ViewFood} /> 
                        <Route path="/create-serviceList-continue" component={ServiceList1} /> 
                        <Route path="/ingredientOrder-View/:id" component={ViewIngredientOrder} /> 

          </Switch>
        </section>
        <Footer />

      </Router>
    </div>
  );
}

export default App;
