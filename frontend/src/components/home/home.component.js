import React, { Component } from "react";
//import css
import './home.css';
//import images
import UserService from "../../services/user.service";
import deluxeRoom from '../../images/deluxe-room.jpg';
import familyRoom from '../../images/family-room.jpg';
import singleRoom from '../../images/single-room.jpg';
import gallery1 from '../../images/gallery-1.jpg';
import gallery2 from '../../images/gallery-2.jpg';
import gallery3 from '../../images/gallery-3.jpg';
import gallery4 from '../../images/gallery-4.jpg';
//import icons
import { FaRegClock } from 'react-icons/fa';
import { HiOutlineMail, HiOutlineLocationMarker } from 'react-icons/hi';
import { FiPhoneCall } from 'react-icons/fi';


export default class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      content: ""
    };
  }

  componentDidMount() {
    UserService.getPublicContent().then(
      response => {
        this.setState({
          content: response.data
        });
      },
      error => {
        this.setState({
          content:
            (error.response && error.response.data) ||
            error.message ||
            error.toString()
        });
      }
    );
  }

  render() {
    return (
      <div className="container-home">

        <section id="hero" class="d-flex align-items-center">
          <div class="container position-relative text-center text-lg-start" data-aos="zoom-in" data-aos-delay="100">
            <div class="row">
              <div class="col-lg-8">
                <h1>Welcome to Hotel Skylight <span></span></h1>
                <h2>Delivering great food for more than 18 years!</h2>
              </div>
              <div class="col-lg-4 d-flex align-items-center justify-content-center position-relative" data-aos="zoom-in" data-aos-delay="200">

              </div>

            </div>
          </div>
        </section>

        <section id="rooms" class="rooms">
          <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2>Rooms and Suites</h2>
            </div>

            <div class="row">

              <div class="col-lg-4 col-md-6">
                <div class="member" data-aos="zoom-in" data-aos-delay="100">
                  <img src={deluxeRoom} class="img-fluid" alt="" />
                  <div class="member-info">
                    <div class="member-info-content">
                      <h4>Deluxe Room</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6">
                <div class="member" data-aos="zoom-in" data-aos-delay="200">
                  <img src={familyRoom} class="img-fluid" alt="" />
                  <div class="member-info">
                    <div class="member-info-content">
                      <h4>Family Room</h4>
                    </div>
                  </div>
                </div>
              </div>

              <div class="col-lg-4 col-md-6">
                <div class="member" data-aos="zoom-in" data-aos-delay="300">
                  <img src={singleRoom} class="img-fluid" alt="" />
                  <div class="member-info">
                    <div class="member-info-content">
                      <h4>Single Room</h4>
                    </div>
                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
        <section id="gallery" class="gallery">

          <div class="container" data-aos="fade-up">
            <div class="section-title">
              <h2>Dining and Drinks</h2>
            </div>
          </div>

          <div class="container-fluid" data-aos="fade-up" data-aos-delay="100">

            <div class="row g-0">

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                    <img src={gallery1} alt="" class="img-fluid" />
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                    <img src={gallery2} alt="" class="img-fluid" />
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                    <img src={gallery3} alt="" class="img-fluid" />
                </div>
              </div>

              <div class="col-lg-3 col-md-4">
                <div class="gallery-item">
                    <img src={gallery4} alt="" class="img-fluid" />
                </div>
              </div>

            </div>

          </div>
        </section>
        <section id="contact" class="contact">
          <div class="container" data-aos="fade-up">

            <div class="section-title">
              <h2>About</h2>
              <p>Having embraced over 3 decades of expertise in hospitality our vision and beliefs are firmly grounded in extending a true personalized service to all our guests, laced with an unforgettable luxury hotel experience.</p>
            </div>
          </div>

          <div class="container">

            <div class="row">

              <div class="info">
                <div class="address">
                  <div class="i">
                    <HiOutlineLocationMarker />
                  </div>
                  <h4>Location:</h4>
                  <p>No.2 Main Street, Colombo</p><br />
                </div>

                <div class="open-hours">
                  <div class="i">
                    <FaRegClock />
                  </div>
                  <h4>Open Hours:</h4>
                  <p>
                    Monday-Saturday:<br />
                    11:00 AM - 2300 PM
                  </p>
                </div>

                <div class="email">
                  <div class="i">
                    <HiOutlineMail />
                  </div>
                  <h4>Email:</h4>
                  <p>info@skylight.com</p><br />
                </div>

                <div class="phone">
                  <div class="i">
                    <FiPhoneCall />
                  </div>
                  <h4>Call:</h4>
                  <p>+94 255 255 111</p><br />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}