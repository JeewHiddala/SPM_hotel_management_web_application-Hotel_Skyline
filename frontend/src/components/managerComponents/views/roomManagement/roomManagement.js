import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';
import ReactPaginate from 'react-paginate';

class RoomManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            roomNumber : "",
            rooms: [],
            isDropdownClicked: false
            
        }
        this.deleteRoom = this.deleteRoom.bind(this);
        this.navigateCreateRoomPage = this.navigateCreateRoomPage.bind(this);
        this.navigateEditRoomPage = this.navigateEditRoomPage.bind(this);
        this.navigateSearchRoomPage = this.navigateSearchRoomPage.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);  //pagination
        this.retrieveRooms = this.retrieveRooms.bind(this);     //pagination
    }

    componentDidMount() {   //inbuild function
        this.fetchRoomDetails_Manager();
    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    fetchRoomDetails_Manager() {
        axios.get('http://localhost:8100/room/')
            .then(response => {
                this.setState({ rooms: response.data.data.docs });
                this.setState({ totalPages: response.data.data.totalPages });
            })

    }

    navigateEditRoomPage(e, roomId) {                 //edit
        window.location = `/updateRoom/${roomId}`
    }

    navigateSearchRoomPage(e) {      //search
        e.preventDefault();   
        console.log("abcd", this.state.roomNumber);
        let roomNo = this.state.roomNumber;        
        window.location = `/searchRoom/${roomNo}`
    }

    navigateCreateRoomPage(e) {
        window.location = '/createRoom'
    }

    retrieveRooms(page) {               //pagination
        console.log("Pagef", page);
        axios.get('http://localhost:8100/room/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ rooms: response.data.data.docs });
                console.log("WPF", response.data.data);
            })
    };

    handlePageChange = (data) => {          //pagination
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.retrieveRooms(selected);
    };

    deleteRoom(e, roomId) {
        console.log("I am on Delete", roomId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it permanently!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/room/${roomId}`)
                Swal.fire(
                    'Deleted!',
                    'Room has been deleted.',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/roomManagement'
                    }
                })
            }
        })
    }

    dropdown(e) {
        this.setState(prevState => ({
            isDropdownClicked: !prevState.isDropdownClicked
        }))
    }

    render() {
        const { isDropdownClicked } = this.state;
        return (
            <div>
                <br /><br />
                <br />
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h3><b className ="super-topic">Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch">

                                <div className="row">
                                    <div className="container" >
                                        <h5><b className="sub-topic">Creations</b></h5>
                                        <div className="list-group">
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" id="active-button" aria-current="true">Room Management</button></a>
                                            <button type="button" className="list-group-item list-group-item-action" data-bs-toggle="dropdown" aria-expanded="false" onClick={e => this.dropdown(e)}>
                                                Employee Management
                                            </button>
                                            {isDropdownClicked && (
                                                <div>
                                                    <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Working Employees</button></a>
                                                    <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Retired Employees</button></a>
                                                </div>
                                            )}

                                            <a href="/serviceManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service Management</button></a>
                                        </div>
                                        <br></br>
                                        <h5><b className="sub-topic">Monitoring</b></h5>
                                        <div class="list-group">
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">View Service Bills</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >
                                                View Booking Bills
                                            </button></a>
                                            <a href="/kitchenHeadDashboard" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">View Ingredient Ordering</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendence</button></a>
                                            <a href="/salaryManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Salary Management</button></a>
                                            <a href="/create-foodManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Price Lists</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br/>
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateRoomPage(e)}>Create New Room</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.navigateSearchRoomPage}>
                                            <input 
                                                className="form-control me-2" 
                                                type="text" 
                                                placeholder="Enter room number" 
                                                aria-label="Search"
                                                name="roomNumber"
                                                value={this.state.roomNumber}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                             />
                                            <button className="btn btn-primary" type="submit" >Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="topic"><b>Rooms DataTable</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Room Number</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">A/C Category</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Availability</th>
                                                    <th scope="col">Price</th>
                                                    <th scope="col"></th>
                                                    <th scope="col"></th>
                                                </tr>
                                            </thead>
                                            <tbody>{this.state.rooms.length > 0 && this.state.rooms.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.roomNo}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.airConditioningCategory}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.isAvailable.toString() === 'true'
                                                        ? <div><span className="badge bg-success"> Available </span></div>
                                                        : <div><span className="badge bg-danger"> Unavailable </span></div>}
                                                    </td>
                                                    <td>{item.price}</td>
                                                    <td><button type="button" className="btn btn-warning" onClick={e => this.navigateEditRoomPage(e, item._id)}>Edit</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.deleteRoom(e, item._id)}>Delete</button></td>
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

export default RoomManagement;