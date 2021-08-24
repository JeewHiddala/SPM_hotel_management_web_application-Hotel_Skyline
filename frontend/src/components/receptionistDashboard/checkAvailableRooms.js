import './checkAvailableRooms.css';
// import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
// import CheckoutSteps from '../checkoutSteps/checkoutSteps'
import './dash.css';

class CheckAvailableRooms extends Component {
    constructor(props) {
        super(props);

        this.state = {
            room: [],

        }
        // this.deleteResearchPaperUpload = this.deleteResearchPaperUpload.bind(this);
        // this.viewResearchPaperUpload = this.viewResearchPaperUpload.bind(this);
        //  this.createBooking = this.createBooking.bind(this);
        this.navigateBookingPage = this.navigateBookingPage.bind(this);
    }
    componentDidMount() {
        axios.get('http://localhost:8100/room/availableRooms')
            .then(response => {
                this.setState({ room: response.data.data });
            })

    }

    navigateBookingPage(e, roomId) {
        // window.location = `/createBooking`
        this.props.history.push({
            pathname: `/createBooking/${roomId}`,
            data: `${roomId}`
        });
    }


    navigate(e, roomId) {

    }

    // createBooking(e, booking){
    //   this.props.history.push({
    //     pathname: `/booking/${booking}`,
    //     // data:`${this.goforBooking}`
    //   });
    // }


    //   deleteResearchPaperUpload(e , researchPaperId) {
    //     console.log("Delete", researchPaperId)
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.delete(`http://localhost:7000/researchPaper/${researchPaperId}`)
    //             Swal.fire(
    //                 'Deleted!',
    //                 'Research Paper has been deleted.',
    //                 'success'
    //             )
    //         }
    //     })
    //   }




    render() {
        return (

            <div>
                <br></br>
                <br></br>
                <br></br>
                {/* <br /><br />

          <h1 className="hotel-name"> Hotel Skylight</h1>
          <br />
          <div className="container">
              <div className="row justify-content-end">
                  <div className="col-1">
                      Username
                  </div>
              </div>
          </div>
          <br /> */}
                <div className="row justify-content-center">
                    <div className="container-dash">
                        <h2><b>Receptionist Dashboard</b></h2>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                                                Room Booking Management
                                            </button></a>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Leaves</button>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Attendance</button>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <button type="button" className="list-group-item list-group-item-action">Service List Bill</button>
                                            <button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button>
                                        </div>
                                    </div>
                                </div>
                                <br /><br /><br /><br />
                                <br></br>
                                <br></br>
                                <br></br>
                                <br></br>

                            </div>
                            <div className="col-8">
                                <div className="container" >


                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h3 className="h3"><b>Check Available Rooms</b></h3>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>


                                                    <th scope="col">Room No</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">A/C Category</th>
                                                    <th scope="col">Description</th>

                                                    <th scope="col">Price(Rs.)</th>

                                                    <th>Status</th>
                                                    <th></th>


                                                </tr>
                                            </thead>
                                            <tbody>

                                                {this.state.room.length > 0 && this.state.room.map((item, index) => (

                                                    <tr key={index}>
                                                        <td>{item.roomNo}</td>
                                                        <td>{item.category}</td>
                                                        <td>{item.airConditioningCategory}</td>
                                                        <td>{item.description}</td>

                                                        <td>{item.price}</td>


                                                        <td><button type="button" className="btn btn-default" onClick={e => this.navigat(e, item._id)}


                                                        >Available</button></td>
                                                        <td><button type="button" className="btn btn-success" onClick={e => this.navigateBookingPage(e, item._id)}  >Book</button></td>


                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <br /><br /><br /><br />
                <br /><br /><br /><br />
            </div>

        )
    }
}


export default CheckAvailableRooms;