// import '../checkAvailableRooms.css';
import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
import './roomBookingManagement.css';
import './dash.css';
import ReactPaginate from 'react-paginate';

class roomBookingManagement extends Component {

    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            booking: [],

        }
        this.deleteBooking = this.deleteBooking.bind(this);
        this.viewBooking = this.viewBooking.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);  //pagination
        this.retriveBookingPages = this.retriveBookingPages.bind(this); 

    }

    componentDidMount() {
        axios.get('http://localhost:8100/booking/get/')
            .then(response => {
                this.setState({ booking: response.data.data });
                this.setState({ booking: response.data.data.docs });          //pagination
                this.setState({ totalPages: response.data.data.totalPages }); 
                console.log("abc" + response.data.data);
                //   console.log("a"+response.data.booking)
            })


        // axios.get(`http://localhost:8100/booking/${data}`)
        // .then(response => {
        //   this.setState({researchPaper: response.data.data});
        //   this.setState({ title: response.data.data.title });
        //   console.log( "abc"+response.data.data.title);
        // })



        // axios.get('http://localhost:8100/room/${}')
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



    }



    viewBooking(e, bookingId) {
        this.props.history.push({
            pathname: `/viewbooking/${bookingId}`,
            data: `${bookingId}`
        });
    }

    retriveBookingPages(page) {               //pagination
        console.log("Pagef", page);
        axios.get('http://localhost:8100/booking/get/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ booking: response.data.data.docs });
                console.log("WPF", response.data.data);
            })
    };

    handlePageChange = (data) => {          //pagination
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.retriveBookingPages(selected);
    };


    deleteBooking(e, bookingId) {
        console.log("Delete", bookingId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/booking/${bookingId}`)
                Swal.fire(
                    'Deleted!',
                    'Booking Removed.',
                    'success'
                )
            }
            window.location.reload(false);
        })
    }


    render() {
        return (
            <div>
                <br></br>
                <br></br>
                <br></br>
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h2><b>Receptionist Dashboard</b></h2>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" id="active-button" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true" >
                                                Room Booking Management
                                            </button></a>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Leaves</button>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Attendance</button>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br /><br /><br /><br />
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
                                        <h3 className="h3"><b>Room Booking Management</b></h3>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>ID</th>
                                                    <th>RoomNo</th>
                                                    <th>BoardingType</th>
                                                    <th>BookingDate</th>
                                                    <th>Guests</th>
                                                    <th>Days</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.booking.length > 0 && this.state.booking.map((item, index) => (
                                                    <tr key={index}>
                                                        <td>{item.bookingNo}</td>
                                                        <td>{item.roomNo}</td>
                                                        <td>{item.boardingType}</td>
                                                        <td>{item.bookingDate}</td>
                                                        <td>{item.noOfGuests}</td>
                                                        <td>{item.days}</td>
                                                        <td><button type="button" className="btn btn-success" onClick={e => this.viewBooking(e, item._id)}>View</button></td>
                                                        <td><button type="button" className="btn btn-warning">Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteBooking(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                            <br></br>
                                            <br></br>
                                            <br></br>
                                        </table>
                                    </div>
                                    <ReactPaginate
                                        previousLabel={'Previous'}
                                        nextLabel={'Next'}
                                        breakLabel={'...'}
                                        breakClassName={'break-me'}
                                        pageCount={this.state.totalPages}
                                        marginPagesDisplayed={2}
                                        pageRangeDisplayed={5}
                                        onPageChange={this.handlePageChange}
                                        containerClassName={'pagination'}
                                        activeClassName={'active'}
                                    />
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

export default roomBookingManagement;