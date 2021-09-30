import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';

const initialState = {      //initiate states
    serviceNo: '',
    name: '',
    addedDate: '',
    pricePerHour: 0,
    description: '',
    employeeCount: 0
}

class EditService extends Component {
    constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);  //bind onChange function.
        this.onSubmit = this.onSubmit.bind(this);   //bind onSubmit function.
        this.back = this.back.bind(this);
        this.state = initialState;      //apply states.
    }

    componentDidMount() {
        const editServicedetails = this.props.match.params.id;
        console.log("rrrr" + editServicedetails);
        axios.get(`http://localhost:8100/service/${editServicedetails}`)
          .then(response => {
            this.setState({ id: response.data.data._id })
            this.setState({ serviceNo: response.data.data.serviceNo })
            this.setState({ name: response.data.data.name })
            this.setState({ addedDate: response.data.data.addedDate })
            this.setState({ pricePerHour: response.data.data.pricePerHour })
            this.setState({ description: response.data.data.description })
            this.setState({ employeeCount: response.data.data.employeeCount })
    
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
        window.location = '/serviceManagement'
    }

    onSubmit(e) {      //submit details
        e.preventDefault();     //avoid browser refresh. because if browser refresh, erase all typed info in form automatically.
        let service = {
            serviceNo: this.state.serviceNo,
            name: this.state.name,
            addedDate: this.state.addedDate,
            pricePerHour: this.state.pricePerHour,
            description: this.state.description,
            employeeCount: this.state.employeeCount
        }
        console.log('DATA TO SEND', service);    
        axios.patch(`http://localhost:8100/service/update/${this.state.id}`, service)
            .then(response => {
                Swal.fire({
                    position: 'center',
                    icon: 'success',
                    title: 'Updated Service details has been saved',
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
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Room Management</button></a>
                                            <button type="button" className="list-group-item list-group-item-action " >
                                                Employee Management
                                            </button>
                                            <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Working Employees</button></a>
                                            <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Retired Employees</button></a>
                                            <a href="/serviceManagement" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Service Management</button></a>
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
                                        <br/>
                                        <h4 className="topic"><b>Edit Service Details</b></h4>
                                    </div>

                                    <br />
                                    <div className="container">
                                    <form onSubmit={this.onSubmit}>
                                        <div className = "row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="serviceNo" className="form-label sub-topic">Service Number</label>
                                            <input
                                                readOnly
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Service Number"
                                                id="serviceNo"
                                                name="serviceNo"    //give state name
                                                pattern="[A-Z]{2}[0-9]{3}"
                                                required
                                                value={this.state.serviceNo}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                        <div className="col-6">
                                            <label htmlFor="name" className="form-label sub-topic">Service Name</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                placeholder = "Enter Service Number"
                                                id="name"
                                                name="name"    //give state name
                                                required
                                                value={this.state.name}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                        </div>
                                        <div className = "row mb-3">
                                        <div className="col-6">
                                            <label htmlFor="addedDate" className="form-label sub-topic">Added Date</label>
                                            <input
                                                readOnly
                                                type="date"
                                                className="form-control"
                                                id="addedDate"
                                                name="addedDate"    //give state name
                                                required
                                                value={this.state.addedDate}      //bind state value
                                                onChange={this.onChange}    //don't call function. only give a reference.
                                            />
                                        </div>
                                            <div className="col-6">
                                                <label htmlFor="pricePerHour" className="form-label sub-topic">Price Per Hour</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="pricePerHour"
                                                    name="pricePerHour"
                                                    step="0.01"
                                                    required
                                                    value={this.state.pricePerHour}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            </div>
                                            <div className="col mb-3">
                                                <label htmlFor="description" className="form-label sub-topic">Description</label>
                                                <textarea
                                                   className="form-control"
                                                   placeholder = "Enter Description"
                                                   id="description"
                                                   name="description"    //give state name
                                                   maxLength="100"
                                                   value={this.state.description}      //bind state value
                                                   onChange={this.onChange}    //don't call function. only give a reference. 
                                                />
                                            </div>
                                            <div className="col-6">
                                                <label htmlFor="employeeCount" className="form-label sub-topic">Recruited number of employees</label>
                                                <input
                                                    type="number"
                                                    className="form-control"
                                                    id="employeeCount"
                                                    name="employeeCount"
                                                    required
                                                    value={this.state.employeeCount}
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <br></br>
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

export default EditService;