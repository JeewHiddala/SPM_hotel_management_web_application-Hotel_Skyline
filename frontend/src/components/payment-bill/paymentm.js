
// import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
import image from '../../images/cash.jpg';
import image2 from '../../images/credit.jpg';
//import CheckoutSteps from '../checkoutSteps/checkoutSteps';
//import Swal from "sweetalert2";
//import Select from 'react-select';
import '../payment-bill/paymentForm.css';

const initialState = {

  billNo: '',
  employee: [],
  options: [],
  paymentType: 'select',
  totalCost: 0,
  damageCost: 0,
  serviceCost: 0,
  bookingCost: 0,
  paymentDate: '',
  // selectedRooms:[],
  remarks: ''
}

class Paymentm extends Component {

  constructor(props) {
    super(props);
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onRoomSelect = this.onRoomSelect.bind(this);
    // this.onEditorSelect = this.onEditorSelect.bind(this);
    //  this.onAdminSelect = this.onAdminSelect.bind(this);
    this.state = {

      initialState,
    }

    this.viewcashPayment = this.viewcashPayment.bind(this);

  }

  componentDidMount() {
    const { data } = this.props.location

    console.log("billid: " + data);
    axios.get(`http://localhost:8100/bill/${data}`)
      .then(response => {
        this.setState({ bill: response.data.data });
        this.setState({ billNo: response.data.data.billNo });
        this.setState({ damageCost: response.data.data.damageCost });
        this.setState({ serviceCost: response.data.data.serviceCost });
        this.setState({ bookingCost: response.data.data.bookingCost });
        this.setState({ totalCost: response.data.data.totalCost });
        this.setState({ receptionistName: response.data.data.receptionistName.name });
        console.log("abc" + response.data.data.billNo);
        console.log("abc" + response.data.data.serviceCost);
        console.log("abc" + response.data.data.totalCost);
        console.log("abc" + response.data.data.receptionistName.name);
        //   console.log("a"+response.data.booking)
      })


  }

  viewcashPayment(e, billId) {
    this.props.history.push({
      pathname: `/cashpaymentform/${billId}`,
      data: `${billId}`
    });
  }

  viewcreditPayment(e, billId) {
    this.props.history.push({
      pathname: `/creditpaymentform/${billId}`,
      data: `${billId}`
    });
  }

  back(e, billNo) {
    this.props.history.push({
      pathname: `/reception/viewBill/${billNo}`,
      data: `${billNo}`
    })
  }

  render() {

    const { data } = this.props.location
    console.log("userid: " + data);
    return (
      <div>

        <div className="container1">
          <br></br>
          <br></br>


          <h2>Select Payment Method</h2>
          <form  >

            <div className="row">
              <div className="col-md-6">

                <div>
                  <img className="img-payment" src={image} alt={"logo"} />
                  <br></br>
                  <button type="button" class="btn btn-default btn-lg btn-block" onClick={e => this.viewcashPayment(e, data)}>Pay Using Cash</button>
                </div>
                <br></br>

              </div>
              <div className="col-md-6">
                <div>
                  <img className="img-payment" src={image2} alt={"logo"} ></img>
                  <br/>
                  <button type="button" class="btn btn-default btn-lg btn-block" onClick={e => this.viewcreditPayment(e, data)}>Pay Using Credit Card</button>
                </div>
              </div>
            </div>
            <button type="button" className="btn btn-secondary" onClick={e => this.back(e, data)}> Back</button>
            <br>
            </br>

          </form>


        </div>

      </div>



    )
  }
}

export default Paymentm;