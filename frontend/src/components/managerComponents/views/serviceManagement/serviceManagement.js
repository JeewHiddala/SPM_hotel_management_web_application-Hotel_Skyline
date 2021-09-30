import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';
import ReactPaginate from 'react-paginate';

class ServiceManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            totalPages: 0,
            page: 0,
            serviceNumber:'',
            services: [],
            isDropdownClicked: false
        }
        this.deleteService = this.deleteService.bind(this);
        this.navigateCreateServicePage = this.navigateCreateServicePage.bind(this);
        this.onChange = this.onChange.bind(this);
        this.navigateSearchServicePage = this.navigateSearchServicePage.bind(this);
        this.navigateEditServicePage = this.navigateEditServicePage.bind(this);
        this.dropdown = this.dropdown.bind(this);
        this.handlePageChange = this.handlePageChange.bind(this);  //pagination
        this.retrieveServices = this.retrieveServices.bind(this);     //pagination
    }

    componentDidMount() {   //inbuild function
        this.fetchServiceDetails_Manager();
    }

    fetchServiceDetails_Manager(){
        axios.get('http://localhost:8100/service/')
        .then(response => {
            this.setState({ services: response.data.data });
            this.setState({ services: response.data.data.docs });          //pagination
            this.setState({ totalPages: response.data.data.totalPages });          //pagination
        })

    }

    onChange(e) {     //update states
        this.setState({ [e.target.name]: e.target.value })
    }


    navigateSearchServicePage(e) {      //search
        e.preventDefault();   
        console.log("abcd", this.state.serviceNumber);
        let serviceNo = this.state.serviceNumber;        
        window.location = `/searchService/${serviceNo}`
    }

    navigateEditServicePage(e, serviceId) {
        window.location = `/updateService/${serviceId}`
    }

    navigateCreateServicePage(e) {
        window.location = '/createService'
    }

    retrieveServices(page) {               //pagination
        console.log("Pagef", page);
        axios.get('http://localhost:8100/service/', {
            params: {
                page: page
            }
        })
            .then(response => {
                this.setState({ services: response.data.data.docs });
                console.log("WPF", response.data.data);
            })
    };

    handlePageChange = (data) => {          //pagination
        let selected = data.selected + 1;
        console.log("val", selected);
        this.setState({ page: selected });
        this.retrieveServices(selected);
    };

    deleteService(e , serviceId) {
        console.log("I am on Delete", serviceId)
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
                axios.delete(`http://localhost:8100/service/${serviceId}`)
                Swal.fire(
                    'Deleted!',
                    'Service has been deleted.',
                    'success'
                )
                .then((result) => {
                    if (result.isConfirmed) {
                        window.location = '/serviceManagement'
                    }
                })
            }
        })
    }

    dropdown(e) {
        this.setState(prevState => ({
            isDropdownClicked: !prevState.isDropdownClicked
         }))
    }

    render() {
        const { isDropdownClicked } = this.state;
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
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Room Management</button></a>
                                            <button type="button" className="list-group-item list-group-item-action" data-bs-toggle="dropdown" aria-expanded="false" onClick={e => this.dropdown(e)}>
                                                Employee Management
                                            </button>
                                            {isDropdownClicked && (
                                                <div>
                                                    <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Working Employees</button></a>
                                                    <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Retired Employees</button></a>
                                                </div>
                                            )}
                                            <a href="/serviceManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" id="active-button" aria-current="true">Service Management</button></a>
                                        </div>
                                        <br></br>
                                        <h5><b className="sub-topic">Monitoring</b></h5>
                                        <div class="list-group">
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
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateServicePage(e)}>Add New Service</button>
                                    </div>
                                    
                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.navigateSearchServicePage}>
                                            <input
                                             className="form-control me-2" 
                                             type="search" 
                                             placeholder="Enter service number" 
                                             aria-label="Search"
                                             name="serviceNumber"
                                             value={this.state.serviceNumber}      //bind state value
                                             onChange={this.onChange}    //don't call function. only give a reference.
                                             />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4 className="topic"><b>Services DataTable</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Service Number</th>
                                                    <th scope="col">Service Name</th>
                                                    <th scope="col">Added Date</th>
                                                    <th scope="col">Price per Hour</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Employee Count</th>                                              
                                                    <th scope="col"></th>                                                    
                                                    <th scope="col"></th>  
                                                </tr>
                                            </thead>
                                            <tbody>{this.state.services.length > 0 && this.state.services.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.serviceNo}</td>
                                                    <td>{item.name}</td>
                                                    <td>{item.addedDate}</td>
                                                    <td>{item.pricePerHour}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.employeeCount}</td>
                                                    <td><button type="button" className="btn btn-warning" onClick={e => this.navigateEditServicePage(e, item._id)}>Edit</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.deleteService(e, item._id)}>Delete</button></td>
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

export default ServiceManagement;