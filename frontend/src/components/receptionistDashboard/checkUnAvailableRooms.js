import './checkAvailableRooms.css';
import Swal from "sweetalert2";
import React, { Component } from 'react';
import axios from 'axios';
import './dash.css';
import ReactPaginate from 'react-paginate';



class CheckUnAvailableRooms extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            isAvailable: true,
            id: '',
            roomNo: '',
            room: [],
            searchValue: '',

        }


        this.handlePageChange = this.handlePageChange.bind(this);  //pagination
        this.onChange = this.onChange.bind(this);
        this.retriveUnAvailableRoomsPages = this.retriveUnAvailableRoomsPages.bind(this);     //pagination


    }
    componentDidMount() {
        axios.get('http://localhost:8100/room/unavailableRooms/')
            .then(response => {
                this.setState({ room: response.data.data });
                this.setState({ room: response.data.data.docs });          //pagination
                this.setState({ totalPages: response.data.data.totalPages });          //pagination



            })
    }


    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
        this.setState({ isAvailable: true });
    }


    makeRoomAvailable(e, roomId) {

        console.log("Update", roomId)

        let room = {

            isAvailable: this.state.isAvailable
        }
        console.log('DATA TO SEND', room);

        Swal.fire({
            title: "Make Available the Room!",
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Available!'
        }).then((result) => {
            if (result.isConfirmed) {

                axios.patch(`http://localhost:8100/room/update/${roomId}`, room)
                Swal.fire(
                    'Updated!',
                    'Room Now Available.',
                    'success'
                )
            }
            window.location.reload(false);
        })
    }



    retriveUnAvailableRoomsPages(page) {               //pagination
        console.log("Pagef", page);
        axios.get('http://localhost:8100/room/unavailableRooms', {
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
        this.retriveUnAvailableRoomsPages(selected);
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });

    }



    searchHandler = (event) => {



        let searchResults = this.state.room;
        searchResults = searchResults.filter(result => {
            return result.roomNo.toLowerCase().search(
                event.target.value.toLowerCase()) !== -1;

        });

        this.setState({
            room: searchResults,
            searchValue: event.target.value.toLowerCase()

        }, () => console.log('state', this.state))


    };




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
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Check Available Rooms</button></a>
                                            <a href="/checkUnAvailableRooms" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Check UnAvailable Rooms</button></a>
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


                                    <div className="float-end">
                                        <form className="d-flex" >
                                            <input
                                                className="form-control me-2"
                                                type="search"
                                                placeholder="Enter room number"
                                                aria-label="Search"
                                                name="roomNo"
                                                value={this.state.searchValue}
                                                onChange={this.searchHandler}
                                            />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h3 className="h3"><b>Check UnAvailable Rooms</b></h3>
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
                                                    <th>Status (isAvailable)</th>
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
                                                        <td> UnAvailable ({String(item.isAvailable)})
                                                        </td>

                                                        <td><button type="button" className="btn btn-success" onClick={e => this.makeRoomAvailable(e, item._id)}>Make Available</button></td>

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
                <br /><br />
            </div>

        )
    }
}


export default CheckUnAvailableRooms;