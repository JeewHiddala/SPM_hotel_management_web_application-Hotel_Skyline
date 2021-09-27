import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../css/dash.css';
import moment from 'moment';

const initialState = {      //initiate states
    employee: '',
    receptionist: '',
    status: '',
    date: '',
    updatedDate: ''
}

class ViewAttendance extends Component {
    constructor(props) {
        super(props);

        this.back = this.back.bind(this);
        this.UpdateAttendance = this.UpdateAttendance.bind(this);
        this.state = initialState;      //apply states.
    }

    componentDidMount() {
        let empId = this.props.match.params.empId;
        console.log("ffde", empId);
        axios.get(`http://localhost:8100/attendance/search/${empId}`)
            .then(response => {
                this.setState({ id: response.data.data._id })
                this.setState({ employee: response.data.data.employee.nicNo })
                this.setState({ receptionist: response.data.data.receptionist.name })
                this.setState({ status: response.data.data.status })
                this.setState({ date: response.data.data.createdAt })
                this.setState({ updatedDate: response.data.data.updatedAt })

                console.log("fdsde", response.data.data.status);
                console.log("ffwdwwfrde", response.data.data.updatedAt);
            })

    }

    back(e) {
        window.location = '/attendance/employeeAttendance'
    }

    UpdateAttendance(e, attendanceId) {
        let status = "Left"
        let attendance = {
            status: status
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
                window.location = '/attendance/employeeAttendance'

            })
            .catch(error => {
                console.log("xxx", error.message);
                //alert(error.message)
            })

    }


    render() {

        return (
            <div>
                <br /><br />

                <br />
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h3><b className="super-topic">Receptionist Dashboard</b></h3>
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
                                            <button type="button" className="list-group-item list-group-item-action">Employee Leaves</button>
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

                                    <div>
                                        <br />
                                        <h4 className="topic"><b>View attendance of employee</b></h4>
                                    </div>

                                    <br />
                                    <div className="container">
                                        <form>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="receptionist" className="form-label">Receptionist Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="receptionist"
                                                        name="receptionist"    //give state name
                                                        value={this.state.receptionist}      //bind state value
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="employee" className="form-label">Employee NIC</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="employee"
                                                        name="employee"    //give state name
                                                        value={this.state.employee}      //bind state value
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="receptionist" className="form-label">Status</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="status"
                                                        name="status"    //give state name
                                                        value={this.state.status}      //bind state value
                                                        disabled
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="employee" className="form-label">Date</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="date"
                                                        name="date"    //give state name
                                                        value={moment(this.state.date).format('L')}      //bind state value
                                                        disabled
                                                    />
                                                </div>
                                            </div>
                                            {this.state.status.localeCompare("Working") ? (<p id="attendance-tbl">Marked -<br /> Start time: {moment(this.state.date).format('LTS')}<br />End time: {moment(this.state.updatedDate).format('LTS')}</p>) : (<p></p>)}

                                            <br></br>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    {!this.state.status.localeCompare("Working") && (<button type="button" className="btn btn-warning" onClick={e => this.UpdateAttendance(e, this.state.id)}>Mark as Left</button>)}

                                                </div>

                                            </div>
                                        </form>
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

export default ViewAttendance;