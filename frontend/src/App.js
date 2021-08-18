import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom';    //make routes
import NavBar from './components/navBar/navBar';
import Footer from './components/footer/footer';

function App() {
  return (
    <div>
      <Router>
                <NavBar/>
                    <section>
                        <Switch>
                            

                        </Switch>
                    </section>
                <Footer/>
            </Router>
    </div>
  );
}

export default App;
