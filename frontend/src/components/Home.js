import React, { Component } from 'react';
import './Home.css';


class CustomerHome extends Component {
  constructor(props) {
    super(props);

  }
  render() {
    return (

      <div>


        <section id="hero" className="d-flex align-items-center">
          <div className="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
            <div className="row">
              <div className="col-lg-8">
                <h1>Welcome to Food Ordering <span></span></h1>
                <h2>Delivering you the great food!</h2>

                <div className="btns">
                  <a href="/foods-customer" className="btn-menu animated fadeInUp scrollto" id="a">Our Menu</a>

                </div>
              </div>
              <div className="col-lg-4 d-flex align-items-center justify-content-center position-relative" data-aos="zoom-in" data-aos-delay="200">

              </div>

            </div>
          </div>
        </section>

      </div>

    )
  }
}



export default CustomerHome;