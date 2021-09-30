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
    isWorking: 1,
    userName: '',
    password: '',
    userData: "",
}

class SearchEmployee extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.back = this.back.bind(this);
        this.state = initialState;      //apply states.
        this.navigateEditWorkingEmployeePage = this.navigateEditWorkingEmployeePage.bind(this);
        this.resignEmployee = this.resignEmployee.bind(this);           //change working state of employee
        this.deleteRetiredEmployee = this.deleteRetiredEmployee.bind(this);
    }

    componentDidMount() {
        const searchEmployeedetails = this.props.match.params.id;
        console.log("rrrr" + searchEmployeedetails);
        axios.get(`http://localhost:8100/employee/search/${searchEmployeedetails}`)
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
            this.setState({ isWorking: response.data.data.isWorking })
    
            console.log("stat"+response.data.data)
          })
          .catch(error => {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Sorry. There is no data according to this NIC number!',
                footer: '<a href="/workingEmployee"/>'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/workingEmployee'
                    }
                })
          })
    
      }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }

    resignEmployee(e , employeeId) {
        console.log("I am on Delete", employeeId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Resign that Employee!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.patch(`http://localhost:8100/employee/resign/${employeeId}`)
                Swal.fire(
                    'Resigned!',
                    'Employee has been resigned.',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/workingEmployee'
                    }
        
                })
                // // window.location.reload(false);
                // window.location = '/workingEmployee'
            }
        })
    }

    deleteRetiredEmployee(e , employeeId) {
        console.log("I am on Delete", employeeId)
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
                axios.delete(`http://localhost:8100/employee/${employeeId}`)
                Swal.fire(
                    'Deleted!',
                    'Employee has been deleted.',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/workingEmployee'
                    }
                })
            }
        })
    }

    navigateEditWorkingEmployeePage(e, employeeId) {
        window.location = `/updateWorkingEmployee/${employeeId}`
    }

    back(e) {
        window.location = '/workingEmployee'
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
                                    <div className="col-6">
                                        <br />
                                        <h4 className="topic"><b>Searched Employee Details</b></h4>
                                    </div>

                                    <br />
                                    <div className="container">
                                        <form onSubmit={this.onSubmit}>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="name" className="form-label sub-topic">Employee Name</label>
                                                    <input
                                                        readOnly
                                                        type="text"
                                                        className="form-control"
                                                        id="name"
                                                        name="name"    //give state name
                                                        value={this.state.name}      //bind state value
                                                        onChange={this.onChange}    //don't call function. only give a reference.
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="position" className="form-label sub-topic">Position</label>
                                                    <input
                                                        readOnly
                                                        type="text"
                                                        className="form-control"
                                                        id="position"
                                                        name="position"    //give state name
                                                        value={this.state.position}      //bind state value
                                                        onChange={this.onChange}    //don't call function. only give a reference.
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col-6">
                                                    <label htmlFor="address" className="form-label sub-topic">Email Address</label>
                                                    <input
                                                        readOnly
                                                        type="email"
                                                        className="form-control"
                                                        id="email"
                                                        name="email"
                                                        value={this.state.email}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col-6">
                                                    <label htmlFor="mobileNumber" className="form-label sub-topic">Mobile Number</label>
                                                    <input
                                                        readOnly
                                                        type="tel"
                                                        className="form-control"
                                                        id="mobileNumber"
                                                        name="mobileNumber"
                                                        value={this.state.mobileNumber}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col">
                                                    <label htmlFor="nic" className="form-label sub-topic">National Identity Card Number</label>
                                                    <input
                                                        readOnly
                                                        type="text"
                                                        className="form-control"
                                                        id="nicNo"
                                                        name="nicNo"    //give state name
                                                        value={this.state.nicNo}      //bind state value
                                                        onChange={this.onChange}    //don't call function. only give a reference. 
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="userName" className="form-label sub-topic">Salary</label>
                                                    <input
                                                        readOnly
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
                                                        id="userName"
                                                        name="userName"
                                                        value={this.state.userName}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="password" className="form-label sub-topic">Password</label>
                                                    <input
                                                        readOnly
                                                        type="text"
                                                        className="form-control"
                                                        id="password"
                                                        name="password"
                                                        value={this.state.password}
                                                        onChange={this.onChange}
                                                    />
                                                </div>
                                                <div className="col">
                                                    <label htmlFor="states" className="form-label sub-topic">Status</label><br/>
                                                        {this.state.isWorking == true
                                                            ? <span className="badge bg-success"> Working </span>
                                                            : <span className="badge bg-danger"> Retired </span>
                                                        }
                                                </div>
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    {this.state.isWorking == true
                                                            ? <button type="button" id="button" className="btn btn-warning" onClick={e => this.navigateEditWorkingEmployeePage(e,this.state.id)}>Edit</button>
                                                            : <button type="button" id="button" className="btn btn-warning" disabled onClick={e => this.navigateEditWorkingEmployeePage(e,this.state.id)}>Edit</button>
                                                    }
                                                    {this.state.isWorking == true
                                                                    ? <button type="button" id="button" className="btn btn-danger" onClick={e => this.resignEmployee(e, this.state.id)}>Retire</button>
                                                                    : <button type="button" id="button" className="btn btn-danger" onClick={e => this.deleteRetiredEmployee(e, this.state.id)}>Delete</button>
                                                                }
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

export default SearchEmployee;