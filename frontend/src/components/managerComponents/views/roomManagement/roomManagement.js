import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';

class RoomManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rooms: []
        }
        // this.deleteRetiredEmployee = this.deleteRetiredEmployee.bind(this);
        // this.navigateCreateEmployeePage = this.navigateCreateEmployeePage.bind(this);
        // this.back = this.back.bind(this);
    }

    componentDidMount() {   //inbuild function
        this.fetchRoomDetails_Manager();
    }

    fetchRoomDetails_Manager(){
        axios.get('http://localhost:8100/room/')
        .then(response => {
            this.setState({ rooms: response.data.data });
        })

    }

    // navigateEditAdminPage(e, adminId) {
    //     window.location = `/updateAdmin/${adminId}`
    // }

    // navigateCreateEmployeePage(e) {
    //     window.location = '/createEmployee'
    // }

    // back(e) {
    //     window.location = '/adminSubcategories'
    // }

    // deleteRetiredEmployee(e , employeeId) {
    //     console.log("I am on Delete", employeeId)
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
    //             axios.delete(`http://localhost:8100/employee/${employeeId}`)
    //             Swal.fire(
    //                 'Deleted!',
    //                 'Employee has been deleted.',
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
                                            <a href="/roomManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Room Management</button></a>
                                            <button type="button" className="list-group-item list-group-item-action " >
                                                Employee Management
                                            </button>
                                            <a href="/workingEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Working Employees</button></a>
                                            <a href="/retiredEmployee" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Retired Employees</button></a>
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
                                        <button type="button" className="btn btn-success" >Create New Room</button>
                                    </div>
                                    
                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4><b>Rooms DataTable</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Room Number</th>
                                                    <th scope="col">Category</th>
                                                    <th scope="col">A/C Category</th>
                                                    <th scope="col">Description</th>
                                                    <th scope="col">Availability</th>
                                                    <th scope="col">Price</th>                                              
                                                    <th scope="col"></th>                                                    
                                                    <th scope="col"></th>  
                                                </tr>
                                            </thead>
                                            <tbody>{this.state.rooms.length > 0 && this.state.rooms.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.roomNo}</td>
                                                    <td>{item.category}</td>
                                                    <td>{item.airConditioningCategory}</td>
                                                    <td>{item.description}</td>
                                                    <td>{item.isAvailable.toString() === 'true'
                                                            ? <div> Available </div> 
                                                            : <div> Unavailable </div> } 
                                                    </td>
                                                    <td>{item.price}</td>
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

export default RoomManagement;