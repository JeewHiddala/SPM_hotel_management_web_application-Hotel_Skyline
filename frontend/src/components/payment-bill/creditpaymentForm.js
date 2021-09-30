
import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
//import './paymentForm.css';

const initialState = {
  bill: '',
  billNo: '',
  receptionistName: '',
  cardNo: '',
  amount: 0,
  cvc: 0,
  expireDate: '',
  holderName: ''
}

class CreditPaymentForm extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);

    this.state = initialState;

  }

  componentDidMount() {

    const { data } = this.props.location

    console.log("userid: " + data);
    axios.get(`http://localhost:8100/bill/${data}`)
      .then(response => {
        this.setState({ bill: response.data.data._id });
        this.setState({ billNo: response.data.data.billNo });
        this.setState({ damageCost: response.data.data.damageCost });
        this.setState({ serviceCost: response.data.data.serviceCost });
        this.setState({ bookingCost: response.data.data.bookingCost });
        this.setState({ totalCost: response.data.data.totalCost });
        this.setState({ receptionistName: response.data.data.receptionistName });
        console.log("abc" + response.data.data.billNo);
        console.log("abc" + response.data.data.serviceCost);
        console.log("abc" + response.data.data.totalCost);
        console.log("abc" + response.data.data.receptionistName.name);
      })

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  backtobillingPage(e, billNo) {
    this.props.history.push({
      pathname: `/reception/viewBill/${billNo}`,
      data: `${billNo}`
    })
  }


  onSubmit(e) {
    e.preventDefault();
    const { data } = this.props.location

    console.log("userid: " + data);
    let creditpayment = {
      billId: data,
      billNo: this.state.billNo,
      receptionistName: this.state.receptionistName.name,
      cardNo: this.state.cardNo,
      amount: this.state.totalCost,
      cvc: this.state.cvc,
      expireDate: this.state.expireDate,
      holderName: this.state.holderName
    };

    console.log('DATA TO SEND', creditpayment);


    Swal.fire({
      title: "Pay for the Bill!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Pay!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post('http://localhost:8100/creditpayment/create', creditpayment)
          .then(response => {
            Swal.fire(
              'Credit Payment!',
              'success'
            )
            window.location = '/creditpaymentManagement'
          })
          .catch(error => {
            console.log(error.message);
            alert(error.message)
          })

      }
    })

  }
  render() {
    const { data } = this.props.location
    return (

      <div>
<br/><br/>
        <div className="row justify-content-center" id="dash-box">
          <div className="container-dash">
            <h2><b>Receptionist Dashboard</b></h2>
            <div className="row justify-content-evenly">
              <div className="col-3 align-self-stretch">

                <div className="row">
                  <div className="container" >
                    <h3 className="h3"><b>Creations</b></h3>
                    <div className="list-group">
                      <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Check Available Rooms</button></a>
                      <a href="/checkUnAvailableRooms" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Check UnAvailable Rooms</button></a>
                      <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                        Room Booking Management
                      </button></a>
                      <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                      <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                      <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                      <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Service List Bill</button></a>
                      <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Checkout Handling</button></a>
                    </div>
                  </div>
                </div>
               

              </div>
              <div className="col-8 align-self-stretch">
                <div className="container" ></div>



                <h2>Credit Payment Form</h2>
                <h2>Rs.{this.state.totalCost}</h2>
                <form onSubmit={this.onSubmit} onChange={this.onChange}>

                <div className="row mb-3">
                <div className="col-6">

                <label className="form-label">Bill No</label>
                <input type ="text"
                className="form-control"
                id="billNo"
                name="billNo"
                placeholder="Bill No"
                value={this.state.billNo}
                />
                </div>



                <div className="col-6">
                <label className="form-label">Total Payment Amount (Rs.)</label>

                <input type ="totalCost"
                className="form-control"
                id="totalCost"
                name="totalCost"
                value={this.state.totalCost}

                />
                </div>
                </div>

                <div className="row mb-3">
                <div className="col-6">
                <label className="form-label">Receptionist Name</label>
                <input type ="text"
                className="form-control"
                id="receptionistName"
                name="receptionistName"
                placeholder="Select receptionistName"
                value={this.state.receptionistName.name}

                />
                </div>

                <div className="col-6" >
                <label className="form-label">Card No</label>
                <input type ="text"
                className="form-control"
                id="cardNo"
                name="cardNo"
                placeholder="Card No"
                value={this.state.cardNo}
                onChange={this.onChange}
                />
                </div>
                </div>



                <div className="row mb-3">
                <div className="col-6">
                <label className="form-label">CVC Number</label>
                <input type ="text"
                className="form-control"
                id="cvc"
                name="cvc"
                placeholder="Enter CVC Number"
                value={this.state.cvc}
                onChange={this.onChange}
                />
                </div>


                <div className="col-6">
                <label className="form-label">Card Expiry Date</label>

                <input type ="date"
                className="form-control"
                id="expireDate"
                name="expireDate"
                placeholder="Select Card Expiry Date"
                value={this.state.expireDate}
                onChange={this.onChange}
                />
                </div>
                </div>

                <div className="mb-3">
                <label className="form-label">Card Holder Name</label>

                <input type ="text"
                className="form-control"
                id="holderName"
                name="holderName"
                placeholder="Enter Cardholders Name"
                value={this.state.holderName}
                onChange={this.onChange}
                />
                </div>
             
            <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtobillingPage(e, data)}> Back</button>
            <button type="submit" id="form-button" className="btn btn-success">Pay</button>

          </form>
        </div>
      </div>
          </div >

        </div >
        <br/><br/>
      </div >

    )
  }
}

export default CreditPaymentForm;