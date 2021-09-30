import './createBooking.css';
import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';

const initialState = {

  bookingNo: '',
  customerId: '',
  room: [],
  boardingType: '',
  bookingDate: '',
  noOfGuests: 0,
  days: 0,
  arrivalDate: '',
  remarks: ''
}

class viewBookedRoom extends Component {
  constructor(props) {
    super(props);

    this.state = initialState;
  }


  componentDidMount() {


    const { data } = this.props.location

    console.log("userid: " + data);
    axios.get(`http://localhost:8100/booking/${data}`)
      .then(response => {
        this.setState({ booking: response.data.data });
        this.setState({ bookingNo: response.data.data.bookingNo });
        this.setState({ customerId: response.data.data.customerId });
        this.setState({ roomNo: response.data.data.roomNo });
        this.setState({ boardingType: response.data.data.boardingType });
        this.setState({ bookingDate: response.data.data.bookingDate });
        this.setState({ noOfGuests: response.data.data.noOfGuests });
        this.setState({ days: response.data.data.days });
        this.setState({ arrivalDate: response.data.data.arrivalDate });
        this.setState({ remarks: response.data.data.remarks });
        console.log("abc" + response.data.data.title);
      })
  }


  backtoroombooking(e) {
    window.location = '/roomBookingManagement'
  }


  render() {
    return (

      <div>
        <br /><br />
        <div className="row justify-content-center" id="dash-box">
          <div className="container-dash">
            <h2><b>Receptionist Dashboard</b></h2>
            <div className="row justify-content-evenly">
              <div className="col-3 align-self-stretch">

                <div className="row">
                  <div className="container" >
                    <h3 className="h3"><b>Creations</b></h3>
                    <div className="list-group">
                      <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                      <a href="/roomBookingManagement" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true" >
                        Room Booking Management
                      </button></a>
                      <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                      <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                      <a href="/foodorder" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                      <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service List Bill</button></a>
                      <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button></a>
                    </div>
                  </div>
                </div>


              </div>
              <div className="col-8 align-self-stretch">
                <div className="container" >

                  <div className="col-4">
                    <h4 className="topic"><h2>View Booking Details</h2></h4>
                  </div>

                  <div className="container">
                    <form onSubmit={this.onSubmit} onChange={this.onHandle}>
                      <div className="row mb-3">
                        <div className="col-6">
                          <label htmlFor="bookingNo" className="form-label">Booking No</label>
                          <input type="text"
                            className="form-control"
                            id="bookingNo"
                            name="bookingNo"
                            placeholder="Booking Number"
                            value={this.state.bookingNo}
                            disabled

                          />
                        </div>


                        <div className="col-6">
                          <label htmlFor="customerId" className="form-label">Customer Id</label>

                          <input type="text"
                            className="form-control"
                            id="customerId"
                            name="customerId"
                            placeholder="Enter customer ID"
                            value={this.state.customerId}
                            disabled

                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-6">
                          <label htmlFor="roomNo" className="form-label">Room No</label>

                          <input type="roomNo"
                            className="form-control"
                            id="roomNo"
                            name="roomNo"
                            placeholder="Enter room number"
                            value={this.state.roomNo}
                            onChange={this.onChange}
                            disabled
                          />
                        </div>

                        <div className="col-6">
                          <label htmlFor="boardingType" className="form-label">BoardingType</label>

                          <input type="text"
                            className="form-control"
                            id="boardingType"
                            name="boardingType"
                            placeholder="Select Boarding type"
                            value={this.state.boardingType}
                            onChange={this.onChange}
                            disabled
                          />
                        </div>
                      </div>


                      <div className="row mb-3">
                        <div className="col-6">
                          <label htmlFor="bookingDate" className="form-label">Booking Date</label>

                          <input type="date"
                            className="form-control"
                            id="bookingDate"
                            name="bookingDate"
                            disabled
                            placeholder="Select Booking Date"
                            value={moment(this.state.bookingDate).locale('en').format('YYYY-MM-DD')}


                          />
                        </div>


                        <div className="col-6">
                          <label htmlFor="noOfGuests" className="form-label">No of Guests</label>
                          <input type="number"
                            className="form-control"
                            id="noOfGuests"
                            name="noOfGuests"
                            placeholder="Enter number of guests"
                            value={this.state.noOfGuests}
                            disabled

                          />
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-6">
                          <label htmlFor="days" className="form-label">Days</label>

                          <input type="number"
                            className="form-control"
                            id="days"
                            name="days"
                            placeholder="Enter no of days"
                            value={this.state.days}
                            disabled
                          />
                        </div>
                        <div className="col-6">
                          <label htmlFor="arrivalDate" className="form-label">Arrival Date</label>

                          <input type="date"
                            className="form-control"
                            id="arrivalDate"
                            name="arrivalDate"
                            placeholder="Select arrival date"
                            value={moment(this.state.arrivalDate).locale('en').format('YYYY-MM-DD')}
                            disabled
                          />
                        </div>
                      </div>
                      <div className="row mb-3">
                        <div className="col-6">
                          <label htmlFor="remarks" className="form-label">Remarks</label>
                          <input type="text"
                            className="form-control"
                            id="remarks"
                            name="remarks"
                            placeholder="Enter remarks"
                            value={this.state.remarks}
                            disabled

                          />
                        </div>
                        <div>
                          <br></br>
                          <button type="button" className="btn btn-secondary" onClick={e => this.backtoroombooking(e)}> Back</button>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div >



        <br /><br />
      </div >
    )
  }
}


export default viewBookedRoom;