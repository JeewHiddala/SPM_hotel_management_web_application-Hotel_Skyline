import React, { Component } from 'react';
import axios from 'axios';
import Swal from "sweetalert2";
import '../../../css/dash.css';
import jsPDF from "jspdf";
import "jspdf-autotable";
import reportImage from '../../../../images/logo.jpg';
import UserService from "../../../../services/user.service";

class ServiceListManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            serviceLists: [],
            isManager: false
        }
        this.deleteServiceBill = this.deleteServiceBill.bind(this);
        this.navigateCreateServiceBillPage = this.navigateCreateServiceBillPage.bind(this);
        this.navigateUpdateServiceListPage = this.navigateUpdateServiceListPage.bind(this);
        this.backToManagerDashboard = this.backToManagerDashboard.bind(this);
        this.exportServiceBillReportPDF = this.exportServiceBillReportPDF.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:8100/serviceList/')
            .then(response => {
                this.setState({ serviceLists: response.data.data });
                console.log("abc", response.data.data);
                console.log("fffff", this.state.serviceLists);
            })

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

    ViewSericeList(e, serviceListId) {
        this.props.history.push({
            pathname: `/serviceList-View/${serviceListId}`,
            data: `${serviceListId}`
        });

    }

    backToManagerDashboard(e) {
        window.location = '/workingEmployee'
    }

    navigateUpdateServiceListPage(e, serviceListId) {      //edit
        localStorage.setItem('serviceListId', serviceListId);

        window.location = `/update-ServiceList/${serviceListId}`
    }

    navigateCreateServiceBillPage(e) {
        window.location = '/create-serviceList'
    }


    deleteServiceBill(e, serviceListId) {
        console.log("I am on Delete", serviceListId)
        Swal.fire({
            title: 'Are you sure you want to delete this Service List bill?',
            text: "This item will be deleted immediently. You can't undo this action!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                axios.delete(`http://localhost:8100/serviceList/${serviceListId}`)
                Swal.fire(
                    'Deleted!',
                    'Service Bill is successfully deleted.',
                    'success'
                )
            }
        })
    }

    exportServiceBillReportPDF = () => {
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "portrait"; // portrait or landscape

        const marginLeft = 40;
        const doc = new jsPDF(orientation, unit, size);

        doc.setFontSize(13);

        var reportImg = new Image;
        reportImg.src = reportImage;


        const title = "Service Bill Management Report";
        const headers = [["Booking Number", "Created Date", "Service Name", "Used Date", "No Of Hours", "Price", "Total"]];

        const data = [];
        this.state.serviceLists.map((item, index) => {
            let serviceName = " ";
            let noOfHours = " ";
            let price = " ";
            let date = "";
            item.customerServices.map((item, index) => {
                serviceName = item.serviceName.name;
                noOfHours = item.noOfHours;
                price = item.price;
                date = item.date;


            })

            let serviceLists1 = [
                item.bookingID.bookingNo,
                item.createdDate,
                serviceName,
                date,
                noOfHours,
                price,
                item.total,
            ]
            console.log('eeeee', serviceLists1);
            data.push(serviceLists1)
            //return 0;
        });

        let content = {
            startY: 122,
            head: headers,
            body: data
        };

        doc.addImage(reportImg, 'JPEG', 40, 13, 70, 70);
        doc.text("Skylight Hotel", marginLeft + 80, 25);
        doc.text("No.2 Main Street, Colombo", marginLeft + 80, 40);
        doc.text("info@skylight.com", marginLeft + 80, 55);
        doc.text("+94 255 255 111", marginLeft + 80, 70);

        doc.line(40, 93, 558, 93);

        doc.text(title, marginLeft, 110);
        doc.autoTable(content);

        let marginTop = doc.previousAutoTable.finalY + 45;
        var today = new Date();
        var newdate = "Date Printed : " + today;
        doc.text(marginLeft, marginTop, newdate);
        doc.text("*** Disclaimer : This is an electronically generated report, hence does not require signature.", marginLeft, marginTop + 20);
        doc.line(40, 780, 558, 780);          //bottom line
        doc.save("Service Management Report - Hotel SkyLight.pdf")
    }


    render() {
        return (
            <div>
                <br></br>
                <div className="row justify-content-center" id="dash-box">
                    <div className="container-dash">
                        <h2><b>Receptionist Dashboard</b></h2>
                        <div className="row justify-content-evenly">
                            <div className="col-3 align-self-stretch">

                                <div className="row">
                                    <div className="container" >
                                        <h3 className="h3"><b>Creations</b></h3>
                                        <div className="list-group">
                                            <a href="/checkAvailableRooms" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Check Available Rooms</button></a>
                                            <a href="/roomBookingManagement" className="routeBtn"><button type="button" className="list-group-item list-group-item-action" >
                                                Room Booking Management
                                            </button></a>
                                            <a href="/attendance/employeeLeaves" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Leaves</button></a>
                                            <a href="/attendance/employeeAttendance" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Employee Attendance</button></a>
                                            <a href="/foodorder" className="routeBtn"><button type="button" className="list-group-item list-group-item-action">Food Ordering</button></a>
                                            <a href="/create-serviceListBill" id="active-button" className="routeBtn"><button type="button" className="list-group-item list-group-item-action active" aria-current="true">Service List Bill</button></a>
                                            <a href="/reception/checkout" className="routeBtn"><button type="button" className="list-group-item list-group-item-action ">Checkout Handling</button></a>
                                        </div>
                                    </div>
                                </div>
                                <br />
                            </div>
                            <div className="col-8 align-self-stretch">
                                <div className="container" >

                                    <div className="float-end">
                                        <button type="button" className="btn btn-success" onClick={e => this.navigateCreateServiceBillPage(e)}>Create Service List Bill</button>
                                    </div>

                                    <div className="col-6">
                                        <h2 className="h3"><b>Service List Bill Management</b></h2>
                                    </div>

                                    <br />
                                    <div className="table-responsive">
                                        <table className="table">
                                            <thead className="table-dark">
                                                <tr>
                                                    <th>Booking No</th>
                                                    <th>Date</th>
                                                    <th>Service Name</th>
                                                    <th>Ser.Used.Date</th>
                                                    <th>No of Hours</th>
                                                    <th>Price/ Hour</th>
                                                    <th>Total</th>
                                                    <th></th>
                                                    <th></th>
                                                    <th></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {this.state.serviceLists.length > 0 && this.state.serviceLists.map((item, index) => (
                                                    <tr key={index}>

                                                        <td>{item.bookingID.bookingNo}</td>
                                                        <td>{item.createdDate}</td>

                                                        <td>
                                                            {item.customerServices.map((item, index) => (
                                                                <p id="servicelist-tbl">{item.serviceName.name}</p>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            {item.customerServices.map((item, index) => (
                                                                <p id="servicelist-tbl">{item.date}</p>
                                                            ))}
                                                        </td>

                                                        <td>
                                                            {item.customerServices.map((item, index) => (
                                                                <p id="servicelist-tbl">{item.noOfHours}</p>
                                                            ))}
                                                        </td>
                                                        <td>
                                                            {item.customerServices.map((item, index) => (
                                                                <p id="servicelist-tbl">{item.price}</p>
                                                            ))}
                                                        </td>
                                                        <td>{item.total}</td>


                                                        <td><button type="button" className="btn btn-primary" onClick={e => this.ViewSericeList(e, item._id)}>View</button></td>
                                                        <td><button type="button" className="btn btn-warning" onClick={e => this.navigateUpdateServiceListPage(e, item._id)}>Update</button></td>
                                                        <td><button type="button" className="btn btn-danger" onClick={e => this.deleteServiceBill(e, item._id)}>Delete</button></td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <br />
                                    {this.state.isManager && (
                                        <button type="button" id="button" className="btn btn-secondary" onClick={e => this.backToManagerDashboard(e)}>Back to Manager Dashboard</button>
                                    )}
                                    <div className="generateReportbtn">
                                        <button type="button" className="btn btn-dark" onClick={() => this.exportServiceBillReportPDF()}>Generate Report</button>
                                    </div>
                                    <br /><br />
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

export default ServiceListManagement;