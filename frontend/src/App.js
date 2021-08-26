import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';    //make routes
import NavBar from './components/navBar/navBar';
import Footer from './components/footer/footer';
import Home from './components/home/home';
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
// import ViewServiceList from './components/kitchenHeadComponents/views/dashboard/viewServiceList';

function App() {
  return (
    <div>
      <Router>
                <NavBar/>
                    <section>
                        <Switch>
                        <Route path="/" component={Home} exact />
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
                        {/* <Route path="/serviceList-View" component={ViewServiceList} />  */}
                        </Switch>
                    </section>
                <Footer/>
            </Router>
    </div>
  );
}

export default App;
