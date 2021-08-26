import React, { Component } from 'react';       //import react and react components
import './footer.css';
class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer id="footer">
        {/* <div className="footer-top">
    <div className="container">
      <div className="row">

        <div className="col-lg-3 col-md-6">
          <div className="footer-info">
            <h3>Hotel SkyLight</h3>
            <p>
              Colombo <br></br>
              Sri Lanka<br></br>
              <strong>Phone:</strong> +11 2032145<br></br>
              <strong>Email:</strong> hotelskylight@info.com<br></br>
            </p>
     
          </div>
        </div>

        <div className="col-lg-2 col-md-6 footer-links">
          <h4>Useful Links</h4>
          <ul>
            <li><i className="bx bx-chevron-right"></i> <a href="#">Home</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="#">About us</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="#">Privacy policy</a></li>
          </ul>
        </div>

        <div className="col-lg-3 col-md-6 footer-links">
          <h4>Our Services</h4>
          <ul>
            <li><i className="bx bx-chevron-right"></i> <a href="#">Web Design</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="#">Web Development</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="#">Product Management</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="#">Marketing</a></li>
            <li><i className="bx bx-chevron-right"></i> <a href="#">Graphic Design</a></li>
          </ul>
        </div>

        <div className="col-lg-4 col-md-6 footer-newsletter">
          <h4>Keep in contact with us</h4>
          <p>subscribe to keep in contact with us.</p>
          <form action="" method="post">
            <input type="email" name="email"></input><input type="submit" value="Subscribe"></input>
          </form>

        </div>

      </div>
    </div>
  </div> */}

        <div className="container">
          <div className="copyright">
            &copy; Copyright <strong><span>hotelskylight</span></strong>. All Rights Reserved
          </div>
          <div className="credits">

            Designed by Hotel SkyLight
          </div>
        </div>
      </footer>
    )
  }
}
export default Footer;