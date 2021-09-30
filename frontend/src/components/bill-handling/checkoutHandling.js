import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from "jspdf";
import "jspdf-autotable";
import reportImage from '../../images/logo.jpg';
// import '../receptionist-dashboard/receptionist-dashboard.css';
// import AuthService from "../../services/auth.service";
import UserService from "../../services/user.service";

class CheckoutHandling extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bills: [],
            search: "",
            // currentUser: AuthService.getCurrentUser(),
            isManager: false
        }
        this.deleteCheckoutBill = this.deleteCheckoutBill.bind(this);
        this.searchCheckoutBill = this.searchCheckoutBill.bind(this);
        this.onChange = this.onChange.bind(this);
        this.backToManagerDashboard = this.backToManagerDashboard.bind(this);
        this.viewBillDetails = this.viewBillDetails.bind(this);
        this.navigateCreateCheckoutBill = this.navigateCreateCheckoutBill.bind(this);
        this.navigateUpdateCheckoutBill = this.navigateUpdateCheckoutBill.bind(this);
    }

    componentDidMount() {   //inbuild function
        this.fetchBillsDetails();
        UserService.getUserBoard()
            .then(
                response => {
                    if (!response.data.role.name.localeCompare("Manager")) {
                        this.setState({
                            isManager: true,
                        });
                    }
                }
            );
    }

    fetchBillsDetails() {
        axios.get('http://localhost:8100/bill/')
            .then(response => {
                this.setState({ bills: response.data.data });
                console.log("jjj", response.data.data);
            })

    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    backToManagerDashboard(e) {
        window.location = '/workingEmployee'
    }

    navigateCreateCheckoutBill(e) {
        window.location = '/reception/createCheckoutBill'
    }

    navigateUpdateCheckoutBill(e, billId) {
        window.location = `/reception/updateCheckoutBill/${billId}`
    }

    searchCheckoutBill(e) {
        e.preventDefault();
        axios.get('http://localhost:8100/bill/search/', {
            params: {
                billNo: this.state.search
            }
        })
            .then(response => {
                let billId = response.data.data
                console.log("jjjbill", response.data.data);
                window.location = `/reception/viewBill/${billId}`
            })
            .catch((error) => {
                alert('Enter valid Bill number')
            })


    }

    viewBillDetails(e, billId) {
        window.location = `/reception/viewBill/${billId}`
    }

    deleteCheckoutBill(e, checkoutBillId) {
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
                    .then((result) => {
                        if (result.isConfirmed) {
                            window.location.reload(false);
                        }
                    })

            }
        })
    }

    generateReport = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(13);

        var reportImg = new Image;
        reportImg.src = reportImage;

        const title = "Customer Billing Report";
        const headers = [["Booking Number", "Days of Stay", "Room Booking Cost", "Service Bill Cost", "Damage claims"]];

        doc.addImage(reportImg, 'JPEG', 40, 13, 70, 70);
        doc.text("Skylight Hotel", marginLeft + 80, 25);
        doc.setFontSize(11);
        doc.text("No.2 Main Street, Colombo", marginLeft + 80, 40);
        doc.text("info@skylight.com", marginLeft + 80, 55);
        doc.text("+94 255 255 111", marginLeft + 80, 70);

        doc.line(40, 93, 558, 93);
        doc.setFontSize(13);
        doc.text(title, marginLeft, 110);


        doc.setFontSize(10);
        let x = marginLeft;
        let y = 110;
        this.state.bills.map((item, index) => {
            const data = [];
            doc.text("Receptionist Name:", x, y += 22);
            doc.text(item.receptionistName.name, x + 100, y);
            doc.text("Bill Number;", x, y += 15);
            doc.text(item.billNo, x + 100, y);
            doc.text("Issued Date:", x, y += 15);
            doc.text(item.issuedDate, x + 100, y);
            doc.text("Total Bill Value:", x, y += 15);
            let totalCost = item.totalCost.toString();
            doc.text(totalCost, x + 100, y);
            let bill = [
                item.bookingNo.bookingNo,
                item.daysOfStay,
                item.bookingCost,
                item.serviceCost,
                item.damageCost
            ]
            data.push(bill)
            let content = {
                startY: y += 10,
                head: headers,
                body: data
            };
            doc.autoTable(content);
            y = doc.previousAutoTable.finalY;
        });
        let marginTop = doc.previousAutoTable.finalY + 25;
        var today = new Date();
        var newdate = "Report Issued: " + today;
        doc.text(marginLeft, marginTop, newdate);
        doc.text("*** Disclaimer : This is an electronically generated report, hence does not require signature.", marginLeft, marginTop + 20);
        doc.line(40, 780, 558, 780);          //bottom line
        doc.save("Customer Billing Report - Hotel SkyLight.pdf")
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
                            <div className="col-3 align-self-stretch">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action " >
                                                Room Booking Management
                                            </button></a>
                                            <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" id="active-button" className="list-group-item list-group-item-action active" aria-current="true">Checkout Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >
                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateCheckoutBill(e)}>Create checkout bill</button>
                                    </div>

                                    <div className="float-end">
                                        <form className="d-flex" onSubmit={this.searchCheckoutBill}>
                                            <input className="form-control me-2" type="search" placeholder="Enter Bill number" name="search" value={this.state.search} onChange={this.onChange} aria-label="Search" autoComplete="off" />
                                            <button className="btn btn-primary" type="submit" >Search</button>
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
                                                    <th scope="col">Receptionist Name</th>
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
                                                    <td><button type="button" className="btn btn-warning" onClick={e => this.navigateUpdateCheckoutBill(e, item._id)}>Update</button></td>
                                                    <td><button type="button" className="btn btn-danger" onClick={e => this.deleteCheckoutBill(e, item._id)}>Delete</button></td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    {this.state.isManager && (
                                        <button type="button" id="button" className="btn btn-secondary" onClick={e => this.backToManagerDashboard(e)}>Back to Manager Dashboard</button>
                                    )}
                                    <button type="button" className="btn btn-dark float-end" onClick={e => this.generateReport(e)}>Generate Report</button>
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