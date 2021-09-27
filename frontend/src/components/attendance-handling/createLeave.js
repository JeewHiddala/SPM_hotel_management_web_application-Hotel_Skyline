import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../css/dash.css';
import Select from 'react-select';

const initialState = {      //initiate states
    employeeNIC: '',
    receptionistName: '',
    reason: '',
    leaveDate: '',
    receptionistOptions: [],
    employees: [],
    employeeOptions: [],
    employees1: []
}

class CreateLeave extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        this.back = this.back.bind(this);
        this.handleReceptionistChange = this.handleReceptionistChange.bind(this);
        this.handleEmployeeChange = this.handleEmployeeChange.bind(this);

        this.state = initialState;      //apply states.
    }

    componentDidMount() {
        axios.get('http://localhost:8100/employee/workingReceptionists/')
            .then(response => {
                this.setState({ employees: response.data.data }, () => {
                    let data = [];
                    this.setState({ receptionistOptions: data });
                    this.state.employees.map((item, index) => {
                        let employees = {
                            value: item._id,
                            label: item.name
                        }
                        data.push(employees)
                        return 0;
                    });
                    this.setState({ receptionistOptions: data });

                })

            })
        axios.get('http://localhost:8100/employee/')
            .then(response => {
                this.setState({ employees1: response.data.data }, () => {
                    let data = [];
                    this.setState({ employeeOptions: data });
                    this.state.employees1.map((item, index) => {
                        let employees1 = {
                            value: item._id,
                            label: item.nicNo
                        }
                        data.push(employees1)
                        return 0;
                    });
                    this.setState({ employeeOptions: data });

                })

            })

    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    back(e) {
        window.location = '/attendance/employeeLeaves'
    }

    handleReceptionistChange = receptionistName => {
        this.setState({ receptionistName });
        console.log('Option selected:', receptionistName);
    }

    handleEmployeeChange = employeeNIC => {
        this.setState({ employeeNIC });
        console.log('Option selected:', employeeNIC);
    }

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
        let leave = {
            employeeNIC: this.state.employeeNIC.value,
            receptionistName: this.state.receptionistName.value,
            reason: this.state.reason,
            leaveDate: this.state.leaveDate
        }
        console.log('DATA TO SEND', leave);
        axios.post('http://localhost:8100/employeeLeaves/create', leave)
            .then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New Leave details has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
                window.location = '/attendance/employeeLeaves'
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }


    render() {
        const { employeeNIC } = this.state.employeeNIC;
        const { receptionistName } = this.state.receptionistName;
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
                                            <button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Employee Leaves</button>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" aria-current="true">Employee Attendance</button></a>
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
                                        <h4 className="topic"><b>Create Employee Leaves</b></h4>
                                    </div>

                                    <br />
                                    <div className="container">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="receptionistName" className="form-label">Receptionist Name</label>
                                                    <Select
                                                        className="basic-single"
                                                        name="receptionistName"
                                                        options={this.state.receptionistOptions}
                                                        value={receptionistName}
                                                        onChange={this.handleReceptionistChange}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="employeeNIC" className="form-label">Employee NIC</label>
                                                    <Select
                                                        className="basic-single"
                                                        name="employeeNIC"
                                                        options={this.state.employeeOptions}
                                                        value={employeeNIC}
                                                        onChange={this.handleEmployeeChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="leaveDate" className="form-label">Leave Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        id="leaveDate"
                                                        name="leaveDate"    //give state name
                                                        value={this.state.leaveDate}      //bind state value
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="reason" className="form-label">Reason</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        id="reason"
                                                        name="reason"    //give state name
                                                        value={this.state.reason}      //bind state value
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            
                                            <br></br>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    <button type="submit" id="button" className="btn btn-success">Submit</button>
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

export default CreateLeave;