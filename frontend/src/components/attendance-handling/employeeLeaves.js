import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';


class EmployeeLeaves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            leaves: [],
            search: ""
        }
        this.searchLeaves = this.searchLeaves.bind(this);
        this.onChange = this.onChange.bind(this);
        this.navigateCreateLeave = this.navigateCreateLeave.bind(this);
        this.deleteLeave = this.deleteLeave.bind(this);
        this.retrievePage = this.retrievePage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {   //inbuild function
        this.fetchLeaveDetails();
    }

    fetchLeaveDetails() {
        axios.get('http://localhost:8100/employeeLeaves/')
            .then(response => {
                this.setState({ leaves: response.data.data.docs });
                this.setState({ totalPages: response.data.data.totalPages });
                console.log("WPF", this.state.leaves);
                console.log("TP", this.state.totalPages);
            })

    }

    retrievePage(page) {
        console.log("Pagef ", page);
        axios.get('http://localhost:8100/employeeLeaves/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ leaves: response.data.data.docs });
                console.log("WPF2", response.data.data);

            })

    };



    handlePageChange = (data) => {
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.retrievePage(selected);
    };

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    navigateCreateLeave(e) {
        window.location = '/leaves/createLeave'
    }

    deleteLeave(e, leaveId) {
        console.log("I am on Delete", leaveId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete this record permanently!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/employeeLeaves/${leaveId}`)
                Swal.fire(
                    'Deleted!',
                    'Leave details have been deleted.',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location.reload(false);
                    }
                })
            }
        })

    }

    searchLeaves(e) {
        e.preventDefault();
        axios.get(`http://localhost:8100/employee/search/${this.state.search}`)
            .then(response => {
                let empId = response.data.data._id
                console.log("jjjatt", response.data.data._id);
                window.location = `/leaves/${empId}`
            })
            .catch((error) => {
                alert('Enter valid NIC number')
            })


    }



    render() {
        return (
            <div>
                <br /><br />

                <br />
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h3><b>Receptionist Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                                                Room Booking Management
                                            </button></a>
                                            <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Employee Leaves</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Checkout Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateLeave(e)}>Create Leave</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.searchLeaves}>
                                            <input className="form-control me-2" type="search" placeholder="Enter Employee NIC" name="search" value={this.state.search} onChange={this.onChange} aria-label="Search" autoComplete="off" />
                                            <button className="btn btn-primary" type="submit" >Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4><b>Employee Leaves</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Employee NIC</th>
                                                    <th scope="col">Receptionist Name</th>
                                                    <th scope="col">Leave Date</th>
                                                    <th scope="col">Reason</th>
                                                    <th scope="col"></th>

                                                </tr>
                                            </thead>
                                            <tbody>{this.state.leaves.length > 0 && this.state.leaves.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.employeeNIC.nicNo}</td>
                                                    <td>{item.receptionistName.name}</td>
                                                    <td>{item.leaveDate}</td>
                                                    <td>{item.reason}</td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.deleteLeave(e, item._id)}>Delete</button></td>
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









            </div>
        )
    }
}


export default EmployeeLeaves;