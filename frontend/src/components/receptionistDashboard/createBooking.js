
import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";


const initialState = {
  roomId: '',
  bookingNo: '',
  customerId: '',
  room: [],
  isAvailable: Boolean,
  roomNo: '',
  options: [],
  boardingType: 'select',
  bookingDate: '',
  noOfGuests: 0,
  days: 0,
  arrivalDate: '',
  remarks: ''
}

class createBooking extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.backtoroombooking = this.backtoroombooking.bind(this);
    this.state = initialState;


  }


  componentDidMount() {


    const { data } = this.props.location

    console.log("userid: " + data);
    axios.get(`http://localhost:8100/room/availableRooms/${data}`)
      .then(response => {
        this.setState({ room: response.data.data });
        this.setState({ roomNo: response.data.data.roomNo });
        this.setState({ isAvailable: response.data.data.isAvailable });
        console.log("abc" + response.data.data.roomNo);
        console.log("abc" + response.data.data.isAvailable);
      })




  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
    this.setState({ isAvailable: false });
  }


  backtoroombooking(e) {
    window.location = '/checkAvailableRooms'
  }


  onSubmit(e) {
    e.preventDefault();
    const { data } = this.props.location

    console.log("userid: " + data);
    let booking = {
      roomId: data,
      bookingNo: this.state.bookingNo,
      customerId: this.state.customerId,
      roomNo: this.state.roomNo,
      boardingType: this.state.boardingType,
      bookingDate: this.state.bookingDate,
      noOfGuests: this.state.noOfGuests,
      days: this.state.days,
      arrivalDate: this.state.arrivalDate,
      remarks: this.state.remarks
    };


    let room = {

      isAvailable: this.state.isAvailable
    }

    console.log('DATA TO SEND', booking);
    console.log('DATA TO SEND', room);
    console.log('hrll' + data);
    Swal.fire({
      title: "Book the Room!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Book!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post('http://localhost:8100/booking/create', booking)
        axios.patch(`http://localhost:8100/room/update/${data}`, room)
          .then(response => {
        
            Swal.fire(
              ' Booking!',
              'success'
            )
            window.location = '/checkAvailableRooms'
          })
          .catch(error => {
            console.log(error.message);
            alert(error.message)
          })
      }
    })

  }
  render() {
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
                      <a href="/checkAvailableRooms" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Check Available Rooms</button></a>
                      <a href="/checkUnAvailableRooms" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >Check UnAvailable Rooms</button></a>
                      <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                        Room Booking Management
                      </button></a>
                      <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                      <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                      <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                      <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Service List Bill</button></a>
                      <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Checkout Handling</button></a>
                    </div>
                  </div>
                </div>
               

              </div>
              <div className="col-8 align-self-stretch">
                <div className="container" >



                  <h2>Create Booking</h2>
                  <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "right" }}>

                  </h5>

                  <form onSubmit={this.onSubmit} onChange={this.onHandle}>


                    <div className="row mb-3">
                      <div className="col" style={{ textAlign: "left" }}>
                        <label htmlFor="bookingNo" className="form-label">Booking No</label>
                        <input type="text"
                          className="form-control"
                          id="bookingNo"
                          name="bookingNo"
                          placeholder="Booking Number"
                          value={this.state.bookingNo}
                          onChange={this.onChange}
                          required
                        />
                      </div>


                      <div className="col">
                        <label htmlFor="customerId" className="form-label">Customer Id</label>

                        <input type="text"
                          className="form-control"
                          id="customerId"
                          name="customerId"
                          placeholder="Enter customer ID"
                          value={this.state.customerId}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <div className="row">
                          <div className="col">
                            <label htmlFor="roomNo" className="form-label">Room No</label>
                            <input type="roomNo"
                              className="form-control"
                              id="roomNo"
                              name="roomNo"
                              value={this.state.roomNo}
                              disabled
                            />
                          </div>


                          <div className="col" style={{ textAlign: "left" }}>
                            <label htmlFor="boardingType" className="form-label">BoardingType</label>
                            <br></br>
                            <select className="form-select" id="lang"
                              onChange={this.onChange}
                              value={this.state.boardingType}
                              name="boardingType">
                              <option value="select">Select boarding type </option>
                              <option value="fullboard">Full Board</option>
                              <option value="halfboard">Half Board</option>
                              <option value="breadnbreakfast">Bread And Breakfast</option>
                            </select>
              
                          </div>
                        </div>
                      </div>


                      <div className="col">
                        <label htmlFor="bookingDate" className="form-label">Booking Date</label>

                        <input type="date"
                          className="form-control"
                          id="bookingDate"
                          name="bookingDate"
                          placeholder="Select Booking Date"
                          value={this.state.bookingDate}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="row mb-3">
                      <div className="col">
                        <div className="row">
                          <div className="col">
                            <label htmlFor="noOfGuests" className="form-label">No of Guests</label>
                            <input type="number"
                              className="form-control"
                              id="noOfGuests"
                              name="noOfGuests"
                              placeholder="Enter number of guests"
                              value={this.state.noOfGuests}
                              onChange={this.onChange}
                              required
                            />
                          </div>

                          <div className="col">
                            <label htmlFor="days" className="form-label">Days</label>

                            <input type="number"
                              className="form-control"
                              id="days"
                              name="days"
                              placeholder="Enter no of days"
                              value={this.state.days}
                              onChange={this.onChange}
                              required
                            />
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <label htmlFor="arrivalDate" className="form-label">Arrival Date</label>

                        <input type="date"
                          className="form-control"
                          id="arrivalDate"
                          name="arrivalDate"
                          placeholder="Select arrival date"
                          value={this.state.arrivalDate}
                          onChange={this.onChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="mb-3">
                      <label htmlFor="remarks" className="form-label">Remarks</label>

                      <input type="text"
                        className="form-control"
                        id="remarks"
                        name="remarks"
                        placeholder="Enter remarks"
                        value={this.state.remarks}
                        onChange={this.onChange}
                        required
                      />
                    </div>



                    <button type="button" id="form-button" className="btn btn-secondary" onClick={e => this.backtoroombooking(e)}> Back</button>
                    <button type="submit" id="form-button" className="btn btn-success">Book</button>

                 
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <br/><br/>
      </div>


    )
  }
}

export default createBooking;