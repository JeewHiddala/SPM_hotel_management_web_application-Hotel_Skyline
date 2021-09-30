import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import ReactPaginate from 'react-paginate';
import moment from 'moment';
import UserService from "../../services/user.service";


class EmployeeAttendance extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            attendances: [],
            search: "",
            status: "Left",
            isManager: false
        }
        this.searchAttendance = this.searchAttendance.bind(this);
        this.onChange = this.onChange.bind(this);
        this.navigateCreateAttendance = this.navigateCreateAttendance.bind(this);
        this.UpdateAttendance = this.UpdateAttendance.bind(this);
        this.backToManagerDashboard = this.backToManagerDashboard.bind(this);
        this.retrievePage = this.retrievePage.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);
    }

    componentDidMount() {   //inbuild function
        this.fetchAttendanceDetails();
        UserService.getUserBoard()
            .then(
                response => {
                    if (!response.data.role.name.localeCompare("Manager")) {
                        this.setState({
                            isManager: true,
                        });
                    }
                }
            );
    }

    fetchAttendanceDetails() {
        axios.get('http://localhost:8100/attendance/')
            .then(response => {
                this.setState({ attendances: response.data.data.docs });
                this.setState({ totalPages: response.data.data.totalPages });
                console.log("WPF", this.state.attendances);
                console.log("TP", this.state.totalPages);
            })

    }

    backToManagerDashboard(e) {
        window.location = '/workingEmployee'
    }

    retrievePage(page) {
        console.log("Pagef ", page);
        axios.get('http://localhost:8100/attendance/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ attendances: response.data.data.docs });
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

    navigateCreateAttendance(e) {
        window.location = '/attendance/createAttendance'
    }

    UpdateAttendance(e, attendanceId) {
        let attendance = {
            status: this.state.status
        }
        axios.patch(`http://localhost:8100/attendance/${attendanceId}`, attendance)
            .then(response => {

                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Employee has been marked as Left',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location.reload(false);

            })
            .catch(error => {
                console.log("xxx", error.message);
                //alert(error.message)
            })

    }

    searchAttendance(e) {
        e.preventDefault();
        let date = moment(new Date()).format('L');
        axios.get(`http://localhost:8100/employee/search/${this.state.search}`)
            .then(response => {
                let empId = response.data.data._id
                console.log("jjjatt", response.data.data._id);
                window.location = `/attendance/${empId}`
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
                                            <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Employee Attendance</button></a>
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
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateAttendance(e)}>Create Attendance</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.searchAttendance}>
                                            <input className="form-control me-2" type="search" placeholder="Enter Employee NIC" name="search" value={this.state.search} onChange={this.onChange} aria-label="Search" autoComplete="off" />
                                            <button className="btn btn-primary" type="submit" >Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4><b>Employee Attendance</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Employee NIC</th>
                                                    <th scope="col">Receptionist Name</th>
                                                    <th scope="col">Date</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col"></th>

                                                </tr>
                                            </thead>
                                            <tbody>{this.state.attendances.length > 0 && this.state.attendances.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.employee.nicNo}</td>
                                                    <td>{item.receptionist.name}</td>
                                                    <td>{moment(item.createdAt).format('L')}</td>
                                                    <td>{item.status}</td>
                                                    <td>{!item.status.localeCompare("Working") ? (<button type="button" className="btn btn-warning" onClick={e => this.UpdateAttendance(e, item._id)}>Mark as Left</button>) : (<p id="attendance-tbl">Marked -<br /> Start time: {moment(item.createdAt).format('LTS')}<br />End time: {moment(item.updatedAt).format('LTS')}</p>)}</td>
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
                                    {this.state.isManager && (
                                        <button type="button" id="button" className="btn btn-secondary" onClick={e => this.backToManagerDashboard(e)}>Back to Manager Dashboard</button>
                                    )}
                                </div>
                            </div>
                        </div>

                    </div>
                </div>









            </div>
        )
    }
}


export default EmployeeAttendance;