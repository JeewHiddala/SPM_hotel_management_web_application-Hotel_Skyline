import './checkAvailableRooms.css';
// import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
// import CheckoutSteps from '../checkoutSteps/checkoutSteps'
import './dash.css';
import ReactPaginate from 'react-paginate';


class CheckAvailableRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            room: [],

        }
       
        this.navigateBookingPage = this.navigateBookingPage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);  //pagination
        this.retriveAvailableRoomsPages = this.retriveAvailableRoomsPages.bind(this);     //pagination
    }
    componentDidMount() {
        axios.get('http://localhost:8100/room/availableRooms')
            .then(response => {
                this.setState({ room: response.data.data });
                this.setState({ room: response.data.data.docs });          //pagination
                this.setState({ totalPages: response.data.data.totalPages });          //pagination
            })

    }

    navigateBookingPage(e, roomId) {
        // window.location = `/createBooking`
        this.props.history.push({
            pathname: `/createBooking/${roomId}`,
            data: `${roomId}`
        });
    }

    retriveAvailableRoomsPages(page) {               //pagination
        console.log("Pagef", page);
        axios.get('http://localhost:8100/room/availableRooms', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ room: response.data.data.docs });
                console.log("WPF", response.data.data);
            })
    };

    handlePageChange = (data) => {          //pagination
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.retriveAvailableRoomsPages(selected);
    };


    render() {
        return (

            <div>
                <br></br>
                <br></br>
                <br></br>
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
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Checkout Handling</button></a>
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


export default CheckAvailableRooms;