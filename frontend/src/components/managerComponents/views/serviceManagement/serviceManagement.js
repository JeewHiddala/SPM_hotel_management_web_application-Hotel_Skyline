import React, { Component } from 'react';
import axios from 'axios';
// import Swal from "sweetalert2";
import '../../../css/dash.css';

class ServiceManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            services: []
        }
        // this.deleteRoom = this.deleteRoom.bind(this);
        this.navigateCreateServicePage = this.navigateCreateServicePage.bind(this);
        // this.back = this.back.bind(this);
    }

    componentDidMount() {   //inbuild function
        this.fetchServiceDetails_Manager();
    }

    fetchServiceDetails_Manager(){
        axios.get('http://localhost:8100/service/')
        .then(response => {
            this.setState({ services: response.data.data });
        })

    }

    // navigateEditAdminPage(e, adminId) {
    //     window.location = `/updateAdmin/${adminId}`
    // }

    navigateCreateServicePage(e) {
        window.location = '/createService'
    }

    // back(e) {
    //     window.location = '/adminSubcategories'
    // }

    // deleteRoom(e , roomId) {
    //     console.log("I am on Delete", roomId)
    //     Swal.fire({
    //         title: 'Are you sure?',
    //         text: "You won't be able to revert this!",
    //         icon: 'warning',
    //         showCancelButton: true,
    //         confirmButtonColor: '#3085d6',
    //         cancelButtonColor: '#d33',
    //         confirmButtonText: 'Yes, delete it permanently!'
    //     }).then((result) => {
    //         if (result.isConfirmed) {
    //             axios.delete(`http://localhost:8100/room/${roomId}`)
    //             Swal.fire(
    //                 'Deleted!',
    //                 'Room has been deleted.',
    //                 'success'
    //             )
    //             window.location.reload(false);
    //         }
    //     })
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
                        <h3><b>Manager Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                                <div className="row">
                                    <div className="container" >
                                    <h5><b>Creations</b></h5>
                                        <div className="list-group">
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >Room Management</button></a>
                                            <button type="button" className="list-group-item list-group-item-action " >
                                                Employee Management
                                            </button>
                                            <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Working Employees</button></a>
                                            <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Retired Employees</button></a>
                                            <a href="/serviceManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Service Management</button></a>
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
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateServicePage(e)}>Add New Service</button>
                                    </div>
                                    
                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4><b>Services DataTable</b></h4>
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
                                                    <td><button type="button" className="btn btn-warning" >Update</button></td>
                                                    <td><button type="button" className="btn btn-danger" >Delete</button></td>
                                                </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

export default ServiceManagement;