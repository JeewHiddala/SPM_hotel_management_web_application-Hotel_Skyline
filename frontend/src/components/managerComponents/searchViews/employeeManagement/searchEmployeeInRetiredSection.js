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

class SearchEmployeeInRetiredSection extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        // this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        this.back = this.back.bind(this);
        this.state = initialState;      //apply states.
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
        window.location = '/retiredEmployee'
    }

    // onSubmit(e) {      //submit details
    //     e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
    //     if (!this.state.position.localeCompare("Manager") || !this.state.position.localeCompare("Receptionist") || !this.state.position.localeCompare("Kitchen Head")) {
    //         AuthService.register(
    //             this.state.userName,
    //             this.state.password,
    //             this.state.position
    //         ).then(
    //             response => {
    //                 this.setState({
    //                     userData: response.data.data._id,
    //                 });
    //                 let employee = {
    //                     name: this.state.name,
    //                     position: this.state.position,
    //                     email: this.state.email,
    //                     mobileNumber: this.state.mobileNumber,
    //                     nicNo: this.state.nicNo,
    //                     salary: this.state.salary,
    //                     userName: this.state.userName,
    //                     password: this.state.password,
    //                     userData: this.state.userData
    //                 }
    //                 console.log('DATA TO SEND', employee);
    //                 axios.patch(`http://localhost:8100/employee/update/${this.state.id}`, employee)
    //                     .then(response => {
    //                         // alert('Employee Data successfully inserted')
    //                         this.setState({
    //                             name: '',
    //                             position: '',
    //                             email: '',
    //                             mobileNumber: 0,
    //                             nicNo: '',
    //                             salary: 0,
    //                             userName: '',
    //                             password: '',
    //                             userData: ''
    //                         })
    //                         Swal.fire({
    //                             position: 'center',
    //                             icon: 'success',
    //                             title: 'Updated Employee details has been saved',
    //                             showConfirmButton: false,
    //                             timer: 1500
    //                         })
    //                     })
    //                     .catch(error => {
    //                         console.log(error.message);
    //                         alert(error.message)
    //                     })
    //             },
    //             error => {
    //                 alert('Auth signup failed');
    //             }
    //         );
    //     }else{
    //         let employee = {
    //             name: this.state.name,
    //             position: this.state.position,
    //             email: this.state.email,
    //             mobileNumber: this.state.mobileNumber,
    //             nicNo: this.state.nicNo,
    //             salary: this.state.salary,
    //             userName: this.state.userName,
    //             password: this.state.password
    //         }
    //         console.log('DATA TO SEND', employee);
    //         axios.patch(`http://localhost:8100/employee/update/${this.state.id}`, employee)
    //             .then(response => {
    //                 // alert('Employee Data successfully inserted')
    //                 // this.setState({
    //                 //     name: '',
    //                 //     position: '',
    //                 //     email: '',
    //                 //     mobileNumber: 0,
    //                 //     nicNo: '',
    //                 //     salary: 0,
    //                 //     userName: '',
    //                 //     password: ''
    //                 // })
    //                 Swal.fire({
    //                     position: 'center',
    //                     icon: 'success',
    //                     title: 'Updated Employee details has been saved',
    //                     showConfirmButton: false,
    //                     timer: 1500
    //                 })
    //             })
    //             .catch(error => {
    //                 console.log(error.message);
    //                 alert(error.message)
    //             })
    //         }

    // }


    render() {
        return (
            <div>
                <br /><br />

                {/* <h1 class="hotel-name"> Hotel Skylight</h1>
                <br />
                <div class="container">
                    <div class="row justify-content-end">
                        <div class="col-1">
                            Username
                        </div>
                    </div>
                </div> */}
                <br />
                <div className="row justify-content-center">
                    <div className="container-dash">
                        <h3><b className ="super-topic">Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                                <div className="row">
                                    <div className="container" >
                                        <h5><b className="sub-topic">Creations</b></h5>
                                        <div className="list-group">
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Room Management</button></a>
                                            <button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true" >
                                                Employee Management
                                            </button>
                                            <a href="/workingEmployee" className="routeBtn"><button type="button"  className="list-group-item list-group-item-action">Working Employees</button></a>
                                            <a href="/retiredEmployee" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Retired Employees</button></a>
                                            <a href="/serviceManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service Management</button></a>
                                        </div>
                                        <br></br>
                                        <h5><b className="sub-topic">Monitoring</b></h5>
                                        <div className="list-group">
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">View Service Bills</button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >
                                                View Booking Bills
                                            </button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">View Ingredient Ordering</button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendence</button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Monthly Salary Management</button></a>
                                            <a href="/" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Price Lists</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br /><br /><br /><br />
                            </div>
                            <div className="col-8">
                                <div className="container" >
                                    {/* <div className="float-end">
                                        <button type="button" className="btn btn-success">Create Employee</button>
                                    </div> */}

                                    {/* <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div> */}
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
                                            </div>
                                            <div className="row mb-3">
                                                <div className="col mb-3">
                                                    <button type="button" id="button" className="btn btn-secondary" onClick={e => this.back(e)}> Back</button>
                                                    {/* <button type="button" id="button" className="btn btn-info" > Clear</button> */}
                                                </div>
                                                <div className="col mb-3">
                                                    {/* <button type="submit" id="button" className="btn btn-success float-end">Update</button> */}
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

export default SearchEmployeeInRetiredSection;