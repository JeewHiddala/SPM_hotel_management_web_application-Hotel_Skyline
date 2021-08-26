import './createBooking.css';
// import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
// import image from '../images/w1.jpg';
// import CheckoutSteps from '../checkoutSteps/checkoutSteps';



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
    // this.onChange = this.onChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
    // this.onEditorSelect = this.onEditorSelect.bind(this);
    //  this.onAdminSelect = this.onAdminSelect.bind(this);
    this.state = initialState;
  }

  // componentDidMount() {
  //     axios.get('http://localhost:7000/editor/')
  //         .then(response => {
  //             this.setState({ editors: response.data.data }, () => {
  //                 let data = [];
  //                 this.state.editors.map((item, index) => {
  //                     let editors = {
  //                         value: item._id,
  //                         label: item.name
  //                     }
  //                     data.push(editors)
  //                     console.log("a" + editors);
  //                 });
  //                 this.setState({ options1: data });
  //             })
  //         })

  // }

  // onChange(e) {
  //     this.setState({ [e.target.name]: e.target.value });
  // }

  // onEditorSelect(e) {
  //     this.setState({ selectedEditors: e ? e.map(item => item.value) : [] });
  // }

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
      <div className="container"><br />

        <h2>View Booking Details</h2>
        <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "left" }}>

        </h5>

        <form >

          <div className={"row"}>
            <div className={"col-md-6"}>


              <div className="mb-3" style={{ textAlign: "left" }}>
                <label htmlFor="bookingNo" className="form-label">Booking No</label>
                <input type="text"
                  className="form-control"
                  id="bookingNo"
                  name="bookingNo"
                  placeholder="Booking Number"
                  value={this.state.bookingNo}

                />
              </div>


              <div className="mb-3">
                <label htmlFor="customerId" className="form-label">Customer Id</label>

                <input type="text"
                  className="form-control"
                  id="customerId"
                  name="customerId"
                  placeholder="Enter customer ID"
                  value={this.state.customerId}

                />
              </div>

              <div className="mb-3">
                <label htmlFor="roomNo" className="form-label">Room No</label>
                {/* <Select 
                                    placeholder="Select Room Numbers"
                                    options={this.state.options}
                                    onChange={this.onRoomSelect}
                                    className="basic-multi-select"
                                    isMulti
                                    /> */}
                <input type="roomNo"
                  className="form-control"
                  id="roomNo"
                  name="roomNo"
                  placeholder="Enter room number"
                  value={this.state.roomNo}
                  onChange={this.onChange}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="boardingType" className="form-label">BoardingType</label>

                <input type="text"
                  className="form-control"
                  id="boardingType"
                  name="boardingType"
                  placeholder="Select Boarding type"
                  value={this.state.boardingType}
                  onChange={this.onChange}
                />
              </div>



              <div className="mb-3">
                <label htmlFor="bookingDate" className="form-label">Booking Date</label>

                <input type="text"
                  className="form-control"
                  id="bookingDate"
                  name="bookingDate"
                  placeholder="Select Booking Date"
                  value={this.state.bookingDate}

                />
              </div>


              <div className="mb-3">
                <label htmlFor="noOfGuests" className="form-label">No of Guests</label>
                <input type="number"
                  className="form-control"
                  id="noOfGuests"
                  name="noOfGuests"
                  placeholder="Enter number of guests"
                  value={this.state.noOfGuests}

                />
              </div>

              <div className="mb-3">
                <label htmlFor="days" className="form-label">Days</label>

                <input type="number"
                  className="form-control"
                  id="days"
                  name="days"
                  placeholder="Enter no of days"
                  value={this.state.days}

                />
              </div>


              <div className="mb-3">
                <label htmlFor="arrivalDate" className="form-label">Arrival Date</label>

                <input type="text"
                  className="form-control"
                  id="arrivalDate"
                  name="arrivalDate"
                  placeholder="Select arrival date"
                  value={this.state.arrivalDate}

                />
              </div>


              <div className="mb-3">
                <label htmlFor="remarks" className="form-label">Remarks</label>

                <input type="text"
                  className="form-control"
                  id="remarks"
                  name="remarks"
                  placeholder="Enter remarks"
                  value={this.state.remarks}

                />
              </div>


              <button type="button" className="btn btn-secondary" onClick={e => this.backtoroombooking(e)}> Back</button>

            </div>
          </div>
          <br>
          </br>

        </form>


      </div>


    )
  }
}

export default viewBookedRoom;