
import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
//import './paymentForm.css';
import moment from 'moment';


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

class viewCreditPaymentForm extends Component {
  constructor(props) {
    super(props);
   
    

    this.state = initialState;

  }

  componentDidMount() {

    const { data } = this.props.location

    console.log("userid: " + data);
    axios.get(`http://localhost:8100/creditpayment/${data}`)
      .then(response => {
        this.setState({ creditpayment: response.data.data});
        this.setState({ billNo: response.data.data.billNo });
        this.setState({ receptionistName: response.data.data.receptionistName });
        this.setState({ cardNo: response.data.data.cardNo });
        this.setState({ amount: response.data.data.amount });
        this.setState({ cvc: response.data.data.cvc });
        this.setState({ holderName: response.data.data.holderName });
        this.setState({ expireDate: response.data.data.expireDate });
        console.log("abc" + response.data.data.billNo);
        console.log("abc" + response.data.data.cardNo);
        console.log("abc" + response.data.data.amount);
        
      })

  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  backtoCreditManagementPage(e) {
    window.location = '/creditpaymentManagement'

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
                      <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Checkout Handling</button></a>
                      <a href="creditpaymentManagement"  id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Bill Credit Payment Handling</button></a>
                    </div>
                  </div>
                </div>
               

              </div>
              <div className="col-8 align-self-stretch">
                <div className="container" ></div>



                <h2>Credit Payment Details</h2>
                <h2>Rs.{this.state.amount}</h2>
                <form  >

                <div className="row mb-3">
                <div className="col-6">

                <label className="form-label">Bill No</label>
                <input type ="text"
                className="form-control"
                id="billNo"
                name="billNo"
                placeholder="Bill No"
                value={this.state.billNo}
                disabled
                />
                </div>



                <div className="col-6">
                <label className="form-label">Payment Amount (Rs.)</label>

                <input type ="totalCost"
                className="form-control"
                id="totalCost"
                name="totalCost"
                value={this.state.amount}
                disabled
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
                value={this.state.receptionistName}
                disabled
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
                disabled
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
                disabled
                />
                </div>


                <div className="col-6">
                <label className="form-label">Card Expiry Date</label>

                <input type ="date"
                className="form-control"
                id="expireDate"
                name="expireDate"
                placeholder="Select Card Expiry Date"
                value={moment(this.state.expireDate).locale('en').format('YYYY-MM-DD')}
                disabled
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
                disabled
                />
                </div>
             
            <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoCreditManagementPage(e)}> Back</button>
           
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

export default viewCreditPaymentForm;