import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";


class ViewSearchedLeaves extends Component {
    constructor(props) {
        super(props);
        this.state = {
            leaves: [],
        }
        this.deleteLeave = this.deleteLeave.bind(this);
        this.back = this.back.bind(this);
    }

    componentDidMount() {   //inbuild function
        this.fetchLeaveDetails();
    }

    fetchLeaveDetails() {
        let empId = this.props.match.params.empId;
        console.log("ffde", empId);
        axios.get(`http://localhost:8100/employeeLeaves/search/${empId}`)
            .then(response => {
                this.setState({ leaves: response.data.data });
                console.log("WPF", this.state.leaves);
            })

    }

    back(e) {
        window.location = '/attendance/employeeLeaves'
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
            confirmButtonText: 'Yes, delete this bill permanently!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/employeeLeaves/${leaveId}`)
                Swal.fire(
                    'Deleted!',
                    'Leave details have been deleted.',
                    'success'
                )
                window.location.reload(false);
            }
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
                                <br/>
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                            
                                    <div className="col-4">
                                        <h4><b>View Employee Leaves</b></h4>
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
                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>









            </div>
        )
    }
}


export default ViewSearchedLeaves;