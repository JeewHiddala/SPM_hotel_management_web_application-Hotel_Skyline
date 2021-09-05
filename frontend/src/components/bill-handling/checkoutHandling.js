import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
// import '../receptionist-dashboard/receptionist-dashboard.css';

class CheckoutHandling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: []
        }
        this.deleteCheckoutBill = this.deleteCheckoutBill.bind(this);
        this.navigateCreateCheckoutBill = this.navigateCreateCheckoutBill.bind(this);
    }

    componentDidMount() {   //inbuild function
        this.fetchBillsDetails();
    }

    fetchBillsDetails(){
        axios.get('http://localhost:8100/bill/')
        .then(response => {
            this.setState({ bills: response.data.data });
            console.log("jjj", response.data.data);
        })

    }

    navigateCreateCheckoutBill(e) {
        window.location = '/reception/createCheckoutBill'
    }

    viewBillDetails(e, billId) {
        window.location = `/reception/viewBill/${billId}`
    }

    deleteCheckoutBill(e , checkoutBillId) {
        console.log("I am on Delete", checkoutBillId)
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete this bill permanently!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/bill/${checkoutBillId}`)
                Swal.fire(
                    'Deleted!',
                    'Checkout Bill has been deleted.',
                    'success'
                )
            }
        })
    }


    render() {
        return (
            <div>
                <br /><br />

                <br />
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h3><b>Receptionist Dashboard</b></h3>
                        <div className="row justify-content-evenly">
                            <div className="col-3">

                            <div className="row">
                                        <div className="container" >
                                            <h3 className="h3"><b>Creations</b></h3>
                                            <div className="list-group">
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                                                Room Booking Management
                                            </button></a>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Leaves</button>
                                            <button type="button" className="list-group-item list-group-item-action">Employee Attendance</button>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Checkout Handling</button></a>
                                        </div>
                                        </div>
                                    </div>
                                <br /><br /><br /><br />
                            </div>
                            <div className="col-8">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateCheckoutBill(e)}>Create checkout bill</button>
                                    </div>
                                    
                                    <div className="float-end">
                                        <form className="d-flex">
                                            <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                                            <button className="btn btn-primary" type="submit">Search</button>
                                        </form>
                                    </div>
                                    <div className="col-4">
                                        <h4><b>Bills DataTable</b></h4>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th scope="col">Bill Number</th>
                                                    <th scope="col">Booking Number</th>
                                                    <th scope="col">Receptionist Id</th>
                                                    <th scope="col">Issued Date</th>
                                                    <th scope="col">Total Bill Value</th>
                                                    <th scope="col"></th>                                              
                                                    <th scope="col"></th>                                                    
                                                    <th scope="col"></th>  
                                                </tr>
                                            </thead>
                                            <tbody>{this.state.bills.length > 0 && this.state.bills.map((item, index) => (
                                                <tr key={index}>
                                                    <td>{item.billNo}</td>
                                                    <td>{item.bookingNo.bookingNo}</td>
                                                    <td>{item.receptionistName.name}</td>
                                                    <td>{item.issuedDate}</td>
                                                    <td>{item.totalCost}</td>
                                                    <td><button type="button" className="btn btn-info" onClick={e => this.viewBillDetails(e, item._id)}>View</button></td>
                                                    <td><button type="button" className="btn btn-warning" >Update</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.deleteCheckoutBill(e, item._id)}>Delete</button></td>
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








                
            </div>
        )
    }
}


export default CheckoutHandling;