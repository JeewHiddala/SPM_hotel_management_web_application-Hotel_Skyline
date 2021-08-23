import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';    //make routes
import Footer from './components/footer/footer';
import WorkingEmployee from './components/managerComponents/views/employeeManagement/workingEmployee';    //IT19007502 - Hiddalarachchi J.
import CreateEmployee from './components/managerComponents/createForms/employeeManagament/createEmployee';    //IT19007502 - Hiddalarachchi J.
import RetiredEmployee from './components/managerComponents/views/employeeManagement/retiredEmployee';    //IT19007502 - Hiddalarachchi J.
import RoomManagement from './components/managerComponents/views/roomManagement/roomManagement';    //IT19007502 - Hiddalarachchi J.
import CreateRoom from './components/managerComponents/createForms/roomManagement/createRoom';    //IT19007502 - Hiddalarachchi J.
import ServiceManagement from './components/managerComponents/views/serviceManagement/serviceManagement';    //IT19007502 - Hiddalarachchi J.
import CreateService from './components/managerComponents/createForms/serviceManagement/createService';    //IT19007502 - Hiddalarachchi J.
// import ManagerDashboard from './components/managerComponents/views/dashboard/managerDashboard';
import Login from "./components/login/login.component";
import Home from "./components/home/home.component";
import Profile from "./components/profile/profile.component";
import NavBar from './components/navBar/navBar';
import CustomerRegister from './components/customer-registration/customer-register';


function App() {
  return (
    <div>
      <Router>
                <NavBar/>
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
                        {/* </ManagerDashboard>  */}
                          <Route exact path={["/", "/home"]} component={Home} />
                          <Route exact path="/login" component={Login} />
                          <Route exact path="/register-customer" component={CustomerRegister} />
                          <Route exact path="/profile" component={Profile} />
                          
                        </Switch>
                    </section>
                <Footer/>
            </Router>
    </div>
  );
}

export default App;