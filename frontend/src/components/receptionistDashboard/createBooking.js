
// import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
// import image from '../images/w1.jpg';
// import CheckoutSteps from '../checkoutSteps/checkoutSteps';
import Swal from "sweetalert2";
// import Select from 'react-select';


const initialState = {

  bookingNo: '',
  customerId: '',
  room: [],
  roomNo: '',
  options: [],
  boardingType: 'select',
  bookingDate: '',
  noOfGuests: 0,
  days: 0,
  arrivalDate: '',
  // selectedRooms:[],
  remarks: ''
}

class createBooking extends Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    // this.onRoomSelect = this.onRoomSelect.bind(this);
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


  componentDidMount() {
    // axios.get('http://localhost:8100/room/')
    // .then(response => {
    //   this.setState({ room: response.data.data }, () => {
    //     let data = [];
    //     this.state.room.map((item, index) => {
    //       let room = {
    //         value: item._id,
    //         label: item.roomNo
    //       }
    //       data.push(room)
    //       console.log( "a"+room);
    //     });
    //     this.setState({ options: data });
    //   })
    // })

    const { data } = this.props.location

    console.log("userid: " + data);
    axios.get(`http://localhost:8100/room/availableRooms/${data}`)
      .then(response => {
        this.setState({ room: response.data.data });
        this.setState({ roomNo: response.data.data.roomNo });
        console.log("abc" + response.data.data.roomNo);
      })


  }
  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  // onRoomSelect(e) {
  //   this.setState({ selectedRooms: e ? e.map(item => item.value) : [] });
  // }

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

    console.log('DATA TO SEND', booking);
    Swal.fire({
      title: "Book the Room!",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, Book!'
    }).then((result) => {
      if (result.isConfirmed) {

        axios.post('http://localhost:8100/booking/create', booking)
        .then(response => {
          Swal.fire(
            ' Booking!',
            'success'
          )
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
      <div className="container"><br />

        <h2>Create Booking</h2>
        <h5 htmlFor="content" className="form-label mb-4" style={{ textAlign: "right" }}>

        </h5>

        <form onSubmit={this.onSubmit} onChange={this.onHandle}>

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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
                  // placeholder="Enter room number"
                  value={this.state.roomNo}
                // onChange={this.onChange}
                />
              </div>




              <div className="mb-3" style={{ textAlign: "left" }}>
                <label htmlFor="boardingType" className="form-label">BoardingType</label>
                <br></br>
                <select className="mb-3" id="lang"
                  onChange={this.onChange}
                  value={this.state.boardingType}
                  name="boardingType">
                  <option value="select">Select boarding type </option>
                  <option value="fullboard">Full Board</option>
                  <option value="halfboard">Half Board</option>
                  <option value="breadnbreakfast">Bread And Breakfast</option>
                </select>
                {/* <input type="text"
                  className="form-control"
                  id="boardingType"
                  name="boardingType"
                  placeholder="Select Boarding type"
                  value={this.state.boardingType}
                  onChange={this.onChange}
                /> */}
              </div>



              <div className="mb-3">
                <label htmlFor="bookingDate" className="form-label">Booking Date</label>

                <input type="date"
                  className="form-control"
                  id="bookingDate"
                  name="bookingDate"
                  placeholder="Select Booking Date"
                  value={this.state.bookingDate}
                  onChange={this.onChange}
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
                  onChange={this.onChange}
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
                  onChange={this.onChange}
                />
              </div>


              <div className="mb-3">
                <label htmlFor="arrivalDate" className="form-label">Arrival Date</label>

                <input type="date"
                  className="form-control"
                  id="arrivalDate"
                  name="arrivalDate"
                  placeholder="Select arrival date"
                  value={this.state.arrivalDate}
                  onChange={this.onChange}
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
                  onChange={this.onChange}
                />
              </div>



              <button type="button" className="btn btn-secondary" onClick={e => this.backtoroombooking(e)}> Back</button>
              <button type="submit" className="btn btn-primary">Book</button>
            </div>
          </div>
          <br>
          </br>

        </form>


      </div>



    )
  }
}

export default createBooking;