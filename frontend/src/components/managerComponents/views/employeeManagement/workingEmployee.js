import React, { Component } from 'react';
import axios from 'axios';
// import Swal from "sweetalert2";
import '../../../css/dash.css';
// import Animation from '../../animation/animation';

class WorkingEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            loading: true
        }
        // this.deleteAdmin = this.deleteAdmin.bind(this);
        this.navigateCreateEmployeePage = this.navigateCreateEmployeePage.bind(this);
        // this.back = this.back.bind(this);
    }

    componentDidMount() {   //inbuild function
        this.fetchWorkingEmployee();
    }

    fetchWorkingEmployee(){
        // this.setState({loading:false});
        axios.get('http://localhost:8100/employee/workingEmployees/')
        .then(response => {
            this.setState({ employees: response.data.data });
            // this.setState({loading:true});
        })
    }

    // navigateEditAdminPage(e, adminId) {
    //     window.location = `/updateAdmin/${adminId}`
    // }

    navigateCreateEmployeePage(e) {
        window.location = '/createEmployee'
    }

    // back(e) {
    //     window.location = '/adminSubcategories'
    // }

    render() {
        // if (this.state.loading === false) {
        //     return <Animation />;
        //   } else {
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
                        <h3><b>Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                                <div className="row">
                                    <div className="container" >
                                    <h5><b>Creations</b></h5>
                                        <div className="list-group">
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Room Management</button></a>
                                            {/* <button type="button" className="list-group-item list-group-item-action active" aria-current="true" >
                                                Employee Management
                                            </button> */}
                                            <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Working Employee Management</button></a>
                                            <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" aria-current="true">Retired Employee Management</button></a>
                                            <a href="/serviceManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service Management</button></a>
                                        </div>
                                        <br></br>
                                        <h5><b>Monitoring</b></h5>
                                        <div class="list-group">
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
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateEmployeePage(e)}>Create Employee</button>
                                    </div>
                                    
                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4><b>Working Employees DataTable</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Name</th>
                                                    <th scope="col">Position</th>
                                                    <th scope="col">Email</th>
                                                    <th scope="col">Mobile No</th>
                                                    <th scope="col">NIC No</th>
                                                    <th scope="col">Salary</th>
                                                    <th scope="col">Username</th>                                                    
                                                    <th scope="col">Password</th>
                                                    <th scope="col"></th>  
                                                    <th scope="col"></th>                                                  
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {this.state.employees.length > 0 && this.state.employees.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.name}</td>
                                                    <td>{item.position}</td>
                                                    <td>{item.email}</td>
                                                    <td>{item.mobileNumber}</td>
                                                    <td>{item.nicNo}</td>
                                                    <td>{item.salary}</td>
                                                    <td>{item.userName}</td>
                                                    <td>{item.password}</td>
                                                    <td><button type="button" className="btn btn-warning">Update</button></td>
                                                    <td><button type="button" className="btn btn-danger">Retire</button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className= "generateReportbtn">
                                    <button type="button" className="btn btn-dark">Generate Report</button>
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
    // }
}

export default WorkingEmployee;