
import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
//import Select from 'react-select';
//import './paymentForm.css';

const initialState = {

  billNo: '',
  totalBillValue: 0,
  paymentDate: '',
  receptionistName: '',
  remarks: '',
  bill: []
}

class PaymentForm extends Component {
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
        // this.setState({employee: response.data.data});
        this.setState({ bill: response.data.data });
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
    let cashpayment = {
      billId: data,
      billNo: this.state.billNo,
      totalBillValue: this.state.totalCost,
      paymentDate: this.state.paymentDate,
      receptionistName: this.state.receptionistName.name,

      remarks: this.state.remarks
    };

    console.log('DATA TO SEND', cashpayment);
    Swal.fire({
      title: "pay for the bill!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Pay!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post('http://localhost:8100/cashpayment/create', cashpayment)
          .then(response => {
            Swal.fire(
              'Cash Payment!',
              'success'
            )
            window.location = '/cashpaymentManagement'
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

               
              
                    <h2>Cash Payment Form</h2>
                    <h2>Rs.{this.state.totalCost}</h2>
                    <form onSubmit={this.onSubmit} onChange={this.onChange}>

                      <div className="row mb-3">
                        <div className="col-6">
                            <label className="form-label">Bill No</label>
                            <input type="text"
                              className="form-control"
                              id="billNo"
                              name="billNo"
                              placeholder="Bill No"
                              value={this.state.billNo}
                            />
                          </div>




                          <div className=" col-6">
                            <label className="form-label">Total Payment Amount (Rs.)</label>

                            <input type="totalCost"
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
                            <input type="text"
                              className="form-control"
                              id="receptionistName"
                              name="receptionistName"
                              placeholder="Select receptionistName"
                              value={this.state.receptionistName.name}

                            />
                          </div>


                          <div className="col-6">
                            <label className="form-label">Payment Date/Time</label>

                            <input type="date"
                              className="form-control"
                              id="paymentDate"
                              name="paymentDate"
                              placeholder="Select Payment Date"
                              value={this.state.paymentDate}
                              onChange={this.onChange}
                            />
                          </div>
</div>




                        <div className="mb-3">
                            <label className="form-label">Remarks</label>

                            <input type="text"
                              className="form-control"
                              id="remarks"
                              name="remarks"
                              placeholder="Enter remarks"
                              value={this.state.remarks}
                              onChange={this.onChange}
                            />
                          
</div>



                          <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtobillingPage(e, data)}> Back</button>
                          <button type="submit" id="form-button" className="btn btn-success" > Pay </button>
                        
                    
                    </form>
               </div>
              </div>
            </div>

          </div>
          <br/><br/>
      </div>
    )
  }
}

export default PaymentForm;