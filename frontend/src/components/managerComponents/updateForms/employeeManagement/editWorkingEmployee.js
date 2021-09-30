import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';
import AuthService from "../../../../services/auth.service";

const initialState = {      //initiate states
    name: '',
    position: '',
    email: '',
    mobileNumber: 0,
    nicNo: '',
    salary: 0,
    userName: '',
    password: '',
    userData: "",
}

class EditEmployee extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        this.back = this.back.bind(this);
        this.state = initialState;      //apply states.
    }

    componentDidMount() {
        const editEmployeedetails = this.props.match.params.id;
        console.log("rrrr" + editEmployeedetails);
        axios.get(`http://localhost:8100/employee/${editEmployeedetails}`)
          .then(response => {
            this.setState({ id: response.data.data._id })
            this.setState({ name: response.data.data.name })
            this.setState({ position: response.data.data.position })
            this.setState({ email: response.data.data.email })
            this.setState({ mobileNumber: response.data.data.mobileNumber })
            this.setState({ nicNo: response.data.data.nicNo })
            this.setState({ salary: response.data.data.salary })
            this.setState({ userName: response.data.data.userName })
            this.setState({ password: response.data.data.password })
    
            console.log("stat"+response.data.data)
          })
          .catch(error => {
            alert(error.message)
          })
    
      }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    back(e) {
        window.location = '/workingEmployee'
    }

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
        if (!this.state.position.localeCompare("Manager") || !this.state.position.localeCompare("Receptionist") || !this.state.position.localeCompare("Kitchen Head")) {
            AuthService.register(
                this.state.userName,
                this.state.password,
                this.state.position
            ).then(
                response => {
                    this.setState({
                        userData: response.data.data._id,
                    });
                    let employee = {
                        name: this.state.name,
                        position: this.state.position,
                        email: this.state.email,
                        mobileNumber: this.state.mobileNumber,
                        nicNo: this.state.nicNo,
                        salary: this.state.salary,
                        userName: this.state.userName,
                        password: this.state.password,
                        userData: this.state.userData
                    }
                    console.log('DATA TO SEND', employee);
                    axios.patch(`http://localhost:8100/employee/update/${this.state.id}`, employee)
                        .then(response => {
                            // alert('Employee Data successfully inserted')
                            this.setState({
                                name: '',
                                position: '',
                                email: '',
                                mobileNumber: 0,
                                nicNo: '',
                                salary: 0,
                                userName: '',
                                password: '',
                                userData: ''
                            })
                            Swal.fire({
                                position: 'center',
                                icon: 'success',
                                title: 'Updated Employee details has been saved',
                                showConfirmButton: false,
                                timer: 1500
                            })
                        })
                        .catch(error => {
                            console.log(error.message);
                            alert(error.message)
                        })
                },
                error => {
                    alert('Auth signup failed');
                }
            );
        }else{
            let employee = {
                name: this.state.name,
                position: this.state.position,
                email: this.state.email,
                mobileNumber: this.state.mobileNumber,
                nicNo: this.state.nicNo,
                salary: this.state.salary,
                userName: this.state.userName,
                password: this.state.password
            }
            console.log('DATA TO SEND', employee);
            axios.patch(`http://localhost:8100/employee/update/${this.state.id}`, employee)
                .then(response => {
                    Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Updated Employee details has been saved',
                        showConfirmButton: false,
                        timer: 1500
                    })
                })
                .catch(error => {
                    console.log(error.message);
                    alert(error.message)
                })
            }

    }


    render() {
        return (
            <div>
                <br /><br />
                <br />
                <div className="row justify-content-center">
                    <div className="container-dash">
                        <h3><b className ="super-topic">Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch">

                                <div className="row">
                                    <div className="container" >
                                        <h5><b className="sub-topic">Creations</b></h5>
                                        <div className="list-group">
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Room Management</button></a>
                                            <button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true" >
                                                Employee Management
                                            </button>
                                            <a href="/workingEmployee" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Working Employees</button></a>
                                            <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Retired Employees</button></a>
                                            <a href="/serviceManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service Management</button></a>
                                        </div>
                                        <br></br>
                                        <h5><b className="sub-topic">Monitoring</b></h5>
                                        <div className="list-group">
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
                                <br /><br /><br /><br />
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="col-4">
                                        <br />
                                        <h4 className="topic"><b>Edit Employee Details</b></h4>
                                    </div>

                                    <br />
                                    <div className="container">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="name" className="form-label sub-topic">Employee Name</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter Employee name"
                                                        id="name"
                                                        name="name"    //give state name
                                                        required
                                                        value={this.state.name}      //bind state value
                                                        onChange={this.onChange}    //don't call function. only give a reference.
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="position" className="form-label sub-topic">Position</label>
                                                    <select className="form-select" aria-label="Default select example"
                                                        onChange={this.onChange}
                                                        value={this.state.position}
                                                        name="position"
                                                    >
                                                        <option selected>Open this select position</option>
                                                        <option value="Manager">Manager</option>
                                                        <option value="Receptionist">Receptionist</option>
                                                        <option value="Kitchen Head">Kitchen Head</option>
                                                        <option value="Chef">Chef</option>
                                                        <option value="Assistant Cook">Cook</option>
                                                        <option value="Assistant Manager">Assistant Manager</option>
                                                        <option value="Bar Man">Bar Man</option>
                                                        <option value="Bar Manager">Bar Manager</option>
                                                        <option value="Housekeeper">Housekeeper</option>
                                                        <option value="Bellman">Bellman</option>
                                                        <option value="Waiter" selected>Waiter</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="address" className="form-label sub-topic">Email Address</label>
                                                    <input
                                                        type="email"
                                                        className="form-control"
                                                        placeholder="Enter Email Address"
                                                        pattern=".+@skylight\.com"
                                                        id="email"
                                                        name="email"
                                                        required
                                                        value={this.state.email}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="mobileNumber" className="form-label sub-topic">Mobile Number</label>
                                                    <input
                                                        type="tel"
                                                        className="form-control"
                                                        id="mobileNumber"
                                                        name="mobileNumber"
                                                        pattern="[0-9]{11}"
                                                        maxLength="11"
                                                        minLength="11"
                                                        required
                                                        value={this.state.mobileNumber}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <label htmlFor="nic" className="form-label sub-topic">National Identity Card Number</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter National Identity Card Number"
                                                        id="nicNo"
                                                        name="nicNo"    //give state name
                                                        pattern="[0-9]{10}"
                                                        required
                                                        value={this.state.nicNo}      //bind state value
                                                        onChange={this.onChange}    //don't call function. only give a reference. 
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="userName" className="form-label sub-topic">Salary</label>
                                                    <input
                                                        type="number"
                                                        className="form-control"
                                                        id="salary"
                                                        name="salary"
                                                        value={this.state.salary}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <label htmlFor="password" className="form-label sub-topic">Username</label>
                                                    <input
                                                        readOnly
                                                        type="text"
                                                        className="form-control"
                                                        placeholder="Enter username"
                                                        id="userName"
                                                        name="userName"
                                                        minLength="5"
                                                        value={this.state.userName}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="password" className="form-label sub-topic">Password</label>
                                                    <input
                                                        type="password"
                                                        className="form-control"
                                                        placeholder="Enter password"
                                                        id="password"
                                                        name="password"
                                                        minLength="8"
                                                        // required
                                                        value={this.state.password}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    {/* <button type="button" id="button" className="btn btn-info" > Clear</button> */}
                                                </div>
                                                <div className="col mb-3">
                                                    <button type="submit" id="button" className="btn btn-success float-end">Update</button>
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

export default EditEmployee;