import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';
import Animation from '../../animation/animation';
import ReactPaginate from 'react-paginate';

class WorkingEmployee extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            nicNumber:'',
            employees: [],
            isDropdownClicked: false,
            loading: true
        }
        this.navigateCreateEmployeePage = this.navigateCreateEmployeePage.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.navigateEditWorkingEmployeePage = this.navigateEditWorkingEmployeePage.bind(this);
        this.navigateSearchEmployeePage = this.navigateSearchEmployeePage.bind(this);
        this.navigateHRSalaryReportPage = this.navigateHRSalaryReportPage.bind(this);
        this.resignEmployee = this.resignEmployee.bind(this);           //change working state of employee
        this.handlePageChange = this.handlePageChange.bind(this);  //pagination
        this.workingEmployee = this.workingEmployee.bind(this);     //pagination
    }

    componentDidMount() {   //inbuild function
        this.fetchWorkingEmployee();
    }

    fetchWorkingEmployee(){
        this.setState({loading:false});
        axios.get('http://localhost:8100/employee/workingEmployees/')
        .then(response => {
            this.setState({ employees: response.data.data });
            this.setState({loading:true});
            this.setState({ employees: response.data.data.docs });          //pagination
            this.setState({ totalPages: response.data.data.totalPages });          //pagination
        })
    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }


    navigateSearchEmployeePage(e) {      //search
        e.preventDefault();   
        console.log("abcd", this.state.nicNumber);
        let nicNo = this.state.nicNumber;        
        window.location = `/SearchEmployee/${nicNo}`
    }

    navigateEditWorkingEmployeePage(e, employeeId) {
        window.location = `/updateWorkingEmployee/${employeeId}`
    }

    navigateCreateEmployeePage(e) {
        window.location = '/createEmployee'
    }

    navigateHRSalaryReportPage(e) {
        window.location = '/salaryManagement'
    }

    workingEmployee(page) {               //pagination
        console.log("Pagef", page);
        axios.get('http://localhost:8100/employee/workingEmployees/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ employees: response.data.data.docs });
                console.log("WPF", response.data.data);
            })
    };

    handlePageChange = (data) => {          //pagination
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.workingEmployee(selected);
    };

    dropdown(e) {
        this.setState(prevState => ({
            isDropdownClicked: !prevState.isDropdownClicked
         }))
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
            }
        })
    }

    render() {
        const { isDropdownClicked } = this.state;
        if (this.state.loading === false) {
            return <Animation />;
          } else {
        return (
            <div>
                <br /><br />
                <br />
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h3><b className ="super-topic">Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch">
                                <div className="row">
                                    <div className="container" >
                                    <h5><b className="sub-topic">Creations</b></h5>
                                        <div className="list-group">
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Room Management</button></a>
                                            <button type="button" className="list-group-item list-group-item-action active" id="active-button" data-bs-toggle="dropdown" aria-expanded="false" aria-current="true" onClick={e => this.dropdown(e)}>
                                                Employee Management
                                            </button>
                                            {isDropdownClicked && (
                                                <div>
                                                    <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" id="active-button" aria-current="true">Working Employee Management</button></a>
                                                    <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" aria-current="true">Retired Employee Management</button></a>
                                                </div>
                                            )}
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
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateEmployeePage(e)}>Create Employee</button>
                                    </div>
                                    
                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.navigateSearchEmployeePage}>
                                            <input
                                             className="form-control me-2" 
                                             type="search" 
                                             placeholder="Enter NIC no" 
                                             aria-label="Search" 
                                             name="nicNumber"
                                             value={this.state.nicNumber}      //bind state value
                                             onChange={this.onChange}    //don't call function. only give a reference.
                                             />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="topic"><b>Working Employees DataTable</b></h4>
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
                                                    <td><button type="button" className="btn btn-warning" onClick={e => this.navigateEditWorkingEmployeePage(e, item._id)}>Edit</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.resignEmployee(e, item._id)}>Retire</button></td>
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
                                    <div className= "generateReportbtn">
                                    <button type="button" className="btn btn-dark" onClick={e => this.navigateHRSalaryReportPage(e)}>Generate Human Resourse Report</button>
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
}

export default WorkingEmployee;