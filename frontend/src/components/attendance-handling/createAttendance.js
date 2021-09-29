import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../css/dash.css';
import Select from 'react-select';

const initialState = {      //initiate states
    employee: '',
    receptionist: '',
    status: "Working",
    receptionistOptions: [],
    employees: [],
    employeeOptions: [],
    employees1: []
}

class CreateAttendance extends Component {
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
        window.location = '/attendance/employeeAttendance'
    }

    handleReceptionistChange = receptionist => {
        this.setState({ receptionist });
        console.log('Option selected:', receptionist);
    }

    handleEmployeeChange = employee => {
        this.setState({ employee });
        console.log('Option selected:', employee);
    }

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
        let attendance = {
            employee: this.state.employee.value,
            receptionist: this.state.receptionist.value,
            status: this.state.status,
        }
        console.log('DATA TO SEND', attendance);
        axios.post('http://localhost:8100/attendance/create', attendance)
            .then(response => {
                this.setState({
                    employee: '',
                    receptionist: ''
                })
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'New Attendance details has been saved',
                    showConfirmButton: false,
                    timer: 1500
                })
            })
            .catch(error => {
                console.log(error.message);
                alert(error.message)
            })
    }


    render() {
        const { employee } = this.state.employee;
        const { receptionist } = this.state.receptionist;
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
                                        <h4 className="topic"><b>Mark attendance of employees</b></h4>
                                    </div>

                                    <br />
                                    <div className="container">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="receptionist" className="form-label">Receptionist Name</label>
                                                    <Select
                                                        className="basic-single"
                                                        name="receptionist"
                                                        options={this.state.receptionistOptions}
                                                        value={receptionist}
                                                        onChange={this.handleReceptionistChange}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="employee" className="form-label">Employee NIC</label>
                                                    <Select
                                                        className="basic-single"
                                                        name="employee"
                                                        options={this.state.employeeOptions}
                                                        value={employee}
                                                        onChange={this.handleEmployeeChange}
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

export default CreateAttendance;