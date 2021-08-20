import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';    //make routes
import NavBar from './components/navBar/navBar';
import Footer from './components/footer/footer';
import Home from './components/home/home';
import WorkingEmployee from './components/managerComponents/views/employeeManagement/workingEmployee';    //IT19007502 - Hiddalarachchi J.
import CreateEmployee from './components/managerComponents/createForms/employeeManagament/createEmployee';    //IT19007502 - Hiddalarachchi J.
import RetiredEmployee from './components/managerComponents/views/employeeManagement/retiredEmployee';    //IT19007502 - Hiddalarachchi J.
import RoomManagement from './components/managerComponents/views/roomManagement/roomManagement';    //IT19007502 - Hiddalarachchi J.
import CreateRoom from './components/managerComponents/createForms/roomManagement/createRoom';    //IT19007502 - Hiddalarachchi J.
import ServiceManagement from './components/managerComponents/views/serviceManagement/serviceManagement';    //IT19007502 - Hiddalarachchi J.
// import ManagerDashboard from './components/managerComponents/views/dashboard/managerDashboard';

function App() {
  return (
    <div>
      <Router>
                <NavBar/>
                    <section>
                        <Switch>
                        <Route path="/" component={Home} exact />
                        {/* <ManagerDashboard> */}
                          <Route path="/workingEmployee" component={WorkingEmployee} />
                          <Route path="/createEmployee" component={CreateEmployee} />
                          <Route path="/retiredEmployee" component={RetiredEmployee} />
                          <Route path="/roomManagement" component={RoomManagement} />
                          <Route path="/createRoom" component={CreateRoom} />
                          <Route path="/serviceManagement" component={ServiceManagement} />
                        {/* </ManagerDashboard>  */}
                        </Switch>
                    </section>
                <Footer/>
            </Router>
    </div>
  );
}

export default App;
